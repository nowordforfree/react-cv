import { connect } from 'react-redux';
import { fetchCvs, showCv } from '../actions';
import CvList from '../components/CvList';

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
    cvs: getVisibleCvList(state.cvs.items, state.filter)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCvItems: () => {
      dispatch(fetchCvs());
    },
    onCvClick: (id) => {
      dispatch(showCv(id));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CvList);
