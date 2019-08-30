import React from 'react';
import { withRouter } from 'react-router-dom';

import './story.styles.css';

const Story = ({ id, title, rank, score, descendants, by: author, history }) => (
    <div className="story">
        <div className="story-rank">{rank}.</div>
        <h2 className="story-title">{title}</h2>
        <div className="story-extras">
            <span className="story-extra">{score} points</span>
            <span className="story-extra">by {author}</span>
            <span className="story-extra story-comments" onClick={() => history.push(`/item?id=${id}`)}>{descendants} comments</span>
        </div>
    </div>
);


export default withRouter(Story);