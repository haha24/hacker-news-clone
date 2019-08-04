import React from 'react';

import './page.styles.css';

const Page = ({ text, active, onClick, pageNumber }) => (
    <div className={`paginator_page ${active ? 'paginator_page_active' : ''}`} onClick={onClick.bind(this, pageNumber)}>
        { text }
    </div>
);

export default Page;
