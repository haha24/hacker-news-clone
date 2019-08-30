import types from './story.types';

const INITIAL_STATE = {
    story: null,
    loadingStory: false,
    comments: [],
    loadingComments: false,
    currentPage: 1,
    totalPages: 0,
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH_STORY_START:
            return fetchStoryStart(state, action);
        case types.FETCH_STORY_ERROR:
            return fetchStoryError(state, action);
        case types.FETCH_STORY_RESULT:
            return fetchStoryResult(state, action);
        case types.FETCH_COMMENTS_START:
            return fetchCommentsStart(state, action);
        case types.FETCH_COMMENTS_ERROR:
            return fetchCommentsError(state, action);
        case types.FETCH_COMMENTS_RESULT:
            return fetchCommentsResult(state, action);
        case types.FETCH_STORY_AND_COMMENTS_START:
            return fetchStoryAndCommentsStart(state, action);
        case types.FETCH_STORY_AND_COMMENTS_ERROR:
            return fetchStoryAndCommentsError(state, action);
        case types.FETCH_STORY_AND_COMMENTS_RESULT:
            return fetchStoryAndCommentsResult(state, action);
        default:
            return state;
    }
}

const fetchStoryStart = (state, action) => ({
    ...state,
    loadingStory: true,
    story: null,
});

const fetchStoryError = (state, action) => ({
    ...state,
    loadingStory: false,
});

const fetchStoryResult = (state, action) => ({
    ...state,
    loadingStory: false,
    story: action.payload.story,
});

const fetchCommentsStart = (state, action) => ({
    ...state,
    loadingComments: true,
    currentPage: action.payload,
});

const fetchCommentsError = (state, action) => ({
    ...state,
    loadingComments: false,
});

const fetchCommentsResult = (state, action) => ({
    ...state,
    loadingComments: false,
    comments: action.payload.comments,
    totalPages: action.payload.totalPages,
    currentPage: action.payload.currentPage,
});

const fetchStoryAndCommentsStart = (state, action) => ({
    ...state,
    loadingStory: true,
    loadingComments: true,
    story: null,
    comments: []
});

const fetchStoryAndCommentsError = (state, action) => ({
    ...state,
    loadingStory: false,
    loadingComments: false,
});

const fetchStoryAndCommentsResult = (state, action) => ({
    ...state,
    loadingStory: false,
    loadingComments: false,
    story: action.payload.story,
    comments: action.payload.comments,
});

export default reducer;
