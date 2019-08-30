import { combineReducers } from 'redux';

import storiesReducer from './stories/stories.reducer';
import storyReducer from './story/story.reducer';

const rootReducer = combineReducers({
    stories: storiesReducer,
    story: storyReducer,
});

export default rootReducer;