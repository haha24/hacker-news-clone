import axios from 'axios';

import types from './story.types';
import { getPage } from '../utils/utils';

const COMMENTS_PAGE_SIZE = 10;

export const fetchStory = id => {
    return async dispatch => {
        dispatch(fetchStoryStart());

        try {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            dispatch(fetchStoryResult(response.data));
        }
        catch (error) {
            dispatch(fetchStoryError());
        }
    }
}

const fetchStoryStart = () => ({
    type: types.FETCH_STORY_START,
});

const fetchStoryError = () => ({
    type: types.FETCH_STORY_ERROR,
});

const fetchStoryResult = (story) => ({
    type: types.FETCH_STORY_RESULT,
    payload: {
        story,
    }
});

export const fetchComments = (commentIds, page) => {
    if (!commentIds || commentIds.length === 0 || !page) {
        return fetchCommentsResult();
    }
    return async dispatch => {
        dispatch(fetchCommentsStart(page));
        try {
            const pageData = getPage(commentIds, page, COMMENTS_PAGE_SIZE);
            const totalPages = Math.ceil(commentIds.length / COMMENTS_PAGE_SIZE);

            const commentsData = await fetchChildren(pageData);

            dispatch(fetchCommentsResult(commentsData, page, totalPages));
        }
        catch (error) {
            dispatch(fetchCommentsError());
        }

    }
}

const fetchCommentsStart = (page) => ({
    type: types.FETCH_COMMENTS_START,
    payload: page,
});

const fetchCommentsError = () => ({
    type: types.FETCH_COMMENTS_ERROR,
});

const fetchCommentsResult = (comments, currentPage, totalPages) => ({
    type: types.FETCH_COMMENTS_RESULT,
    payload: {
        comments,
        currentPage,
        totalPages,
    }
});

export const fetchStoryAndComments = (id, page = 1) => {
    return async dispatch => {
        dispatch(fetchStoryAndCommentsStart());

        try {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const storyData = response.data;

            dispatch(fetchStoryResult(storyData));

            if (storyData.kids) {
                const pageData = getPage(storyData.kids, page, COMMENTS_PAGE_SIZE);
                const totalPages = Math.ceil(storyData.kids.length / COMMENTS_PAGE_SIZE);

                const commentsData = await fetchChildren(pageData);


                dispatch(fetchCommentsResult(commentsData, page, totalPages));
            }
            else {
                dispatch(fetchStoryAndCommentsResult(storyData, []));
            }
        }
        catch (error) {
            console.log(error);
            dispatch(fetchStoryAndCommentsError());
        }
    }
}

const fetchChildren = async (ids) => {
    const requests = ids.map(id => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`));
    const responses = await axios.all(requests);
    const responsesData = responses.map(response => response.data);
    for (let i = 0; i < responsesData.length; i++) {
        if (responsesData[i].kids) {
            responsesData[i].kids = await fetchChildren(responsesData[i].kids);
        }
    }

    return responsesData;
}

const fetchStoryAndCommentsStart = () => ({
    type: types.FETCH_STORY_AND_COMMENTS_START,
});

const fetchStoryAndCommentsError = () => ({
    type: types.FETCH_STORY_AND_COMMENTS_ERROR,
});

const fetchStoryAndCommentsResult = (story, comments) => ({
    type: types.FETCH_STORY_AND_COMMENTS_RESULT,
    payload: {
        story,
        comments,
    }
});