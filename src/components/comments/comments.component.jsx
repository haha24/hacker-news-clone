import React from 'react';

import Comment from '../comment';

const Comments = ({comments}) => (
    <div>
        {
            comments.map(({id, ...otherProps}) => <Comment key={id} {...otherProps} />)
        }
    </div>
);

export default Comments;
