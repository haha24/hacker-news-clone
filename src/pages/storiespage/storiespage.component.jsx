import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStories } from '../../redux/stories/stories.actions';
import Stories from '../../components/stories';

import './storiespage.styles.css';

const storyTypeMap = {
    new: 'newstories',
    top: 'topstories',
    best: 'beststories'
}

class StoriesPage extends Component {
    componentDidMount() {
        this.props.fetchStories(storyTypeMap[this.props.match.path.slice(1)]);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.path !== this.props.match.path) {
            this.props.fetchStories(storyTypeMap[this.props.match.path.slice(1)]);
        }
    }

    render() {
        return (
            <div className="storiespage">
                <Stories stories={this.props.stories} />
            </div>
        );
    }
}

const mapStateToProps = ({ stories }) => ({
    stories: stories.stories,
});

const mapDispatchToProps = dispatch => ({
    fetchStories: (type) => dispatch(fetchStories(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoriesPage);
