import React, { Component } from 'react';
import { connect } from 'react-redux';

import Stories from '../../components/stories';
import { fetchStories } from '../../redux/stories/stories.actions';

import './homepage.styles.css';


class HomePage extends Component {
    componentDidMount() {
        this.props.fetchStories();
    }

    render() {
        return (
            <div className="homepage">
                <Stories stories={this.props.stories}/>
            </div>
        );
    }
}

const mapStateToProps = ({ stories }) => ({
    stories: stories.stories,
});

const mapDispatchToProps = dispatch => ({
    fetchStories: () => dispatch(fetchStories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
