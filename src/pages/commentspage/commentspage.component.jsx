import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStoryAndComments, fetchComments } from '../../redux/story/story.actions';
import CommentsStory from '../../components/comments-story';
import Comments from '../../components/comments';
import LoadingWheel from '../../components/loading-wheel';
import Paginator from '../../components/paginator';

import './commentspage.styles.css';

class CommentsPage extends Component {
    switchPage = (pageNumber) => {
        const { history } = this.props;
        const params = new URLSearchParams(this.props.history.location.search);
        history.push(`${history.location.pathname}?id=${params.get('id')}&page=${pageNumber}`)
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.history.location.search);
        const id = Number(params.get('id'));
        const page = Number(params.get('page')) || 1;
        this.props.fetchStoryAndComments(id, page);
    }

    componentDidUpdate(prevProps) {
        const { story } = this.props;
        const params = new URLSearchParams(this.props.history.location.search);
        const page = Number(params.get('page')) || 1;

        const prevPage = prevProps.currentPage;

        if (page !== prevPage && !this.props.loadingComments) {
            console.log('abc');
            this.props.fetchComments(story.kids, page);
        }
    }

    render() {
        const { story, comments, loadingStory, loadingComments, totalPages, currentPage } = this.props;
        if (loadingStory) {
            return <LoadingWheel />
        }


        return (
            <div className="comments_page">
                <CommentsStory {...story} />
                <div>
                    {
                        loadingComments ?
                            <LoadingWheel /> :
                            (<React.Fragment>
                                <Comments comments={comments} />
                                <Paginator onClick={this.switchPage} min={1} max={totalPages} currentPage={currentPage} />
                            </React.Fragment>)
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ story }) => ({
    story: story.story,
    comments: story.comments,
    loadingStory: story.loadingStory,
    loadingComments: story.loadingComments,
    totalPages: story.totalPages,
    currentPage: story.currentPage
});

const mapDispatchToProps = dispatch => ({
    fetchStoryAndComments: (id, page) => dispatch(fetchStoryAndComments(id, page)),
    fetchComments: (commentIds, page) => dispatch(fetchComments(commentIds, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsPage);
