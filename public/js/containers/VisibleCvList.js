import { connect } from 'react-redux';
import { fetchCvs } from '../actions';
import CvTable from '../components/CvTable';

const getVisibleCvList = (cvs, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return cvs;
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const mapStateToProps = (state) => {
  return {
    cvs: getVisibleCvList(state.cvs.items, state.cvs.filter)
  };
};

const mapDispatchToProps = {
  fetchCvs: fetchCvs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CvTable);
