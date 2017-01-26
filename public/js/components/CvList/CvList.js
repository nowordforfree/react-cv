import React from 'react';
import CvListItem from '../CvListItem';

export default class CvList extends React.Component {
  componentDidMount() {
    this.props.getCvItems();
  }
  render() {
    return (
      <ul>
        {this.props.cvs.map(cv => {
          <CvListItem
            key={cv.id}
            {...cv}
            onClick={() => this.props.onCvClick(cv.id) }
          />
        })}
      </ul>
    );
  }
}