import React from 'react';

import './comments-story.styles.css';

const CommentsStory = ({ title, score, descendants, by: author }) => (
    <div className="comments-story">
        <h2 className="comments-story-title">{title}</h2>
        <div className="comments-story-extras">
            <span className="comments-story-extra">{score} points</span>
            <span className="comments-story-extra">by {author}</span>
            <span className="comments-story-extra">{descendants} comments</span>
        </div>
    </div>
);

export default CommentsStory;