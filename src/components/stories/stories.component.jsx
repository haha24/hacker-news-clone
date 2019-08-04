import React from 'react';

import Story from '../story';

import './stories.styles.css';

const Stories = ({ stories, startIndex = 1 }) => (
    <div>
        {
            stories.map((({ id, ...otherProps }, idx) => (
                <Story key={id} rank={startIndex + idx + 1} {...otherProps} />
            )))
        }
    </div>
);

export default Stories;
