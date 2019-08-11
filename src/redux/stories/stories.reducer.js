import storiesTypes from './stories.types';

const INITIAL_STATE = {
    stories: [],
    page: 1,
    size: 10,
    totalPages: 0,
    loading: false,
    type: 'topstories'
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case storiesTypes.FETCH_STORIES_RESULT:
            return fetchStoriesResult(state, action);
        case storiesTypes.FETCH_STORIES_START:
            return fetchStoriesStart(state, action);
        case storiesTypes.FETCH_STORIES_ERROR:
            return fetchStoriesError(state, action);
        default:
            return state;
    }
}

const fetchStoriesStart = (state, action) => ({
    ...state,
    stories: [],
    loading: true,
    page: action.payload.page,
    type: action.payload.type,
});

const fetchStoriesError = (state, action) => ({
    ...state,
    stories: [],
    loading: false,
});

const fetchStoriesResult = (state, action) => ({
    ...state,
    stories: action.payload.data,
    page: action.payload.page,
    size: action.payload.size,
    totalPages: action.payload.totalPages,
    type: action.payload.type,
    loading: false,
});

export default reducer;