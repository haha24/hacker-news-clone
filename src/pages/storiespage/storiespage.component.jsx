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
        if (pageNumber === this.props.currentPage) return;

        this.props.fetchStories('topstories', pageNumber);
    }

    componentDidMount() {
        const storyType = storyTypeMap[this.props.match.path.slice(1)] || storyTypeMap.top; 
        console.log(storyType);
        this.props.fetchStories(storyType);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.path !== this.props.match.path) {
            this.props.fetchStories(storyTypeMap[this.props.match.path.slice(1)]);
        }
    }

    render() {
        const { stories, currentPage, totalPages, loading, pageSize } = this.props;
        if (loading) {
            return <LoadingWheel />;
        }

        return (
            <div className="storiespage">
                <Stories stories={stories} startIndex={(currentPage - 1) * pageSize}/>
                <Paginator min={1} max={totalPages} currentPage={currentPage} onClick={this.switchPage}/>
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
});

const mapDispatchToProps = dispatch => ({
    fetchStories: (type, page) => dispatch(fetchStories(type, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoriesPage);
