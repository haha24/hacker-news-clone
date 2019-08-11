import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStories } from '../../redux/stories/stories.actions';
import Stories from '../../components/stories';
import Paginator from '../../components/paginator';
import LoadingWheel from '../../components/loading-wheel';

import './storiespage.styles.css';

const storyTypeMap = {
    new: 'newstories',
    top: 'topstories',
    best: 'beststories'
}

class StoriesPage extends Component {
    switchPage = (pageNumber) => {
        const { history } = this.props;
        history.push(`${history.location.pathname}?page=${pageNumber}`)
    }

    componentDidMount() {
        const storyType = storyTypeMap[this.props.match.path.slice(1)] || storyTypeMap.top;
        const params = new URLSearchParams(this.props.history.location.search);
        const page = Number(params.get('page')) || 1;

        this.props.fetchStories(storyType, page);
    }

    componentDidUpdate(prevProps) {
        const storyType = storyTypeMap[this.props.match.path.slice(1)] || storyTypeMap.top;
        const params = new URLSearchParams(this.props.history.location.search);
        const page = Number(params.get('page')) || 1;

        const prevStoryType = prevProps.storyType;
        const prevPage = prevProps.currentPage;

        console.log(storyType, page, prevStoryType, prevPage);

        if ((storyType !== prevStoryType || page !== prevPage) && !this.props.loading) {
            console.log('a');
            this.props.fetchStories(storyType, page);
        }
    }

    render() {
        const { stories, currentPage, totalPages, loading, pageSize } = this.props;
        if (loading) {
            return <LoadingWheel />;
        }

        return (
            <div className="storiespage">
                <Stories stories={stories} startIndex={(currentPage - 1) * pageSize} />
                <Paginator min={1} max={totalPages} currentPage={currentPage} onClick={this.switchPage} />
            </div>
        );
    }
}

const mapStateToProps = ({ stories }) => ({
    stories: stories.stories,
    totalPages: stories.totalPages,
    currentPage: stories.page,
    loading: stories.loading,
    pageSize: stories.size,
    storyType: stories.type
});

const mapDispatchToProps = dispatch => ({
    fetchStories: (type, page) => dispatch(fetchStories(type, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoriesPage);
