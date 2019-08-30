import axios from 'axios';

import storiesTypes from './stories.types';
import { getPage } from '../utils/utils';

const PAGE_SIZE = 20;
const DEFAULT_PAGE = 1;

export const fetchStories = (type = 'topstories', page = DEFAULT_PAGE, size = PAGE_SIZE) => {
    return async dispatch => {
        dispatch(fetchStoriesStart(page, type));
        try {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`);
            const data = response.data;

            const pageData = getPage(data, page, size);

            const itemRequests = pageData.map(itemId => (
                axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
            ));

            const itemResponses = await axios.all(itemRequests);
            const storiesDataTemp = itemResponses.map(itemResponse => {
                if (itemResponse.data === null) {
                    console.log(itemResponse);
                }
                return itemResponse.data
            });
            const storiesData = storiesDataTemp.filter(story => story !== null);
            const totalPages = Math.ceil(data.length / size);

            dispatch(fetchStoriesResult(storiesData, page, size, totalPages, type));
        }
        catch (error) {
            console.log(error);
            dispatch(fetchStoriesError());
        }
    }
}

const fetchStoriesStart = (page, type) => ({
    type: storiesTypes.FETCH_STORIES_START,
    payload: {
        page,
        type
    }
});

const fetchStoriesError = () => ({
    type: storiesTypes.FETCH_STORIES_ERROR,
});

const fetchStoriesResult = (data, page, size, totalPages, type) => ({
    type: storiesTypes.FETCH_STORIES_RESULT,
    payload: {
        data,
        page,
        size,
        totalPages,
        type
    }
});