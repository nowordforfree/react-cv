import React from 'react';
import VisibleCvList from '../../containers/VisibleCvList';

export default (props) => {
    return (
        <div className="container text-center">
            Home page text
            <VisibleCvList filter={props.filter || 'SHOW_ALL'} />
        </div>
    );
};