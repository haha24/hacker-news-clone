import React, { Component } from 'react';

import Comments from '../comments';

import './comment.styles.css';

class Comment extends Component {
    state = {
        commentsHidden: false,
    }

    onToggleCommentsHandler = () => {
        this.setState(prevState => ({ commentsHidden: !prevState.commentsHidden }));
    }

    render() {
        const { text, kids, deleted, by: author } = this.props;
        const { commentsHidden } = this.state;

        if (deleted) return null;

        return (
            <div className="comment">
                <div>
                    {
                        commentsHidden ?
                            <span className="comment_hide" onClick={this.onToggleCommentsHandler}>&#9660;</span> :
                            <span className="comment_hide" onClick={this.onToggleCommentsHandler}>&#9650;</span>
                    }
                    <span className="comment_author">{author}</span>
                </div>
                <span className={`comment_text ${commentsHidden ? 'comments_hidden' : ''}`} dangerouslySetInnerHTML={{ __html: text }}></span>
                <div className={`${commentsHidden ? 'comments_hidden' : ''}`}>
                    {
                        kids ? <Comments comments={kids} /> : null
                    }
                </div>
            </div>
        );
    }
}

export default Comment;
