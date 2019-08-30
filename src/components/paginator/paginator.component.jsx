import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Page from './page/page.component';

import './paginator.styles.css';

class Paginator extends Component {

    render() {
        const { min, max, currentPage, onClick } = this.props;
        const numbers = [];

        numbers.push(<Page key="beginning" text="<<" onClick={onClick} pageNumber={min}/>);
        numbers.push(<Page key="previous" text="<" onClick={onClick} pageNumber={Math.max(currentPage - 1, min)}/>);

        const start = Math.max(currentPage - 2, min);
        const end = Math.min(currentPage + 2, max);

        for (let i = start; i <= end; i++) {
            numbers.push(<Page key={i} text={i} active={i === currentPage} onClick={onClick} pageNumber={i}/>);
        }

        numbers.push(<Page key="next" text=">" onClick={onClick} pageNumber={Math.min(currentPage + 1, max)}/>);
        numbers.push(<Page key="end" text=">>" onClick={onClick} pageNumber={max}/>);

        return (
            <div className="paginator">
                { numbers }
            </div>
        );
    }
}

Paginator.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    currentPage: PropTypes.number,
    onClick: PropTypes.func,
}

export default Paginator;