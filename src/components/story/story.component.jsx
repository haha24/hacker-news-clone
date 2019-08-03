import React from 'react';

import './story.styles.css';

const Story = ({ title, rank, score, kids = [], by: author }) => (
    <div className="story">
        <div className="story-rank">{rank}.</div>
        <h2 className="story-title">{title}</h2>
        <div className="story-extras">
            <span className="story-extra">{score} points</span>
            <span className="story-extra">by {author}</span>
            <span className="story-extra">{kids.length} comments</span>
        </div>
    </div>
);


export default Story;