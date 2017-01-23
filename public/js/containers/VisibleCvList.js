import { connect } from 'react-redux';
import { showCv } from '../actions';
import CvList from '../components/CvList';

const getVisibleCvList = (cvs, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return cvs;
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const mapStateToProps = (state, ownProps) => ({
  cvs: getVisibleCvList(state.cvs, ownProps.filter)
});

const mapDispatchToProps = ({
  onCvClick: showCv
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CvList);
