import React from 'react';

import Story from '../story';

import './stories.styles.css';

const Stories = ({ stories }) => (
    <div>
        {
            stories.map((({ id, ...otherProps }, idx) => (
                <Story key={id} rank={idx + 1} {...otherProps} />
            )))
        }
    </div>
);

export default Stories;
