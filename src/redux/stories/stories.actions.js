import storiesTypes from './stories.types';
import axios from 'axios';

export const fetchStories = (type = 'topstories', page = 1, size = 10) => {
    return async dispatch => {
        dispatch(fetchStoriesStart());
        try {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`);
            const data = response.data;
            if (page * size >= data.length) {
                page = Math.ceil(data.length / size);
            }

            const start = (page - 1) * size;
            const end = Math.min((page - 1) * size + size, data.length - 1);
            const pageData = data.slice(start, end);

            const itemRequests = pageData.map(itemId => (
                axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
            ));

            const itemResponses = await axios.all(itemRequests);
            const storiesData = itemResponses.map(itemResponse => itemResponse.data);
            const totalPages = Math.ceil(data.length / size);
            
            dispatch(fetchStoriesResult(storiesData, page, size, totalPages));
        }
        catch (error) {
            console.log(error);
            dispatch(fetchStoriesError());
        }
    }
}

const fetchStoriesStart = () => ({
    type: storiesTypes.FETCH_STORIES_START,
});

const fetchStoriesError = () => ({
    type: storiesTypes.FETCH_STORIES_ERROR,
});

const fetchStoriesResult = (data, page, size, totalPages) => ({
    type: storiesTypes.FETCH_STORIES_RESULT,
    payload: {
        data,
        page,
        size,
        totalPages,
    }
});