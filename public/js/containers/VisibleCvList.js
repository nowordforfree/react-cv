import { connect } from 'react-redux';
import { fetchCvs, setVisibilityFilter } from '../actions';
import CvTable from '../components/CvTable';

const getVisibleCvList = (cvs, filter) => {
  switch (filter.type) {
    case 'SHOW_ALL':
      return cvs;
    case 'FUZZY':
      return cvs.filter(cv => {
        const searchRe = new RegExp(filter.text, 'i');
        return Object.keys(cv).some(key => {
          if (cv[key] instanceof Array) {
            return Object.keys(cv[key]).some(subKey => {
              return searchRe.test(cv[key][subKey]);
            });
          } else {
            return searchRe.test(cv[key]);
          }
        });
      });
    case 'STRICT':
      return cvs.filter(cv => {
        const searchRe = new RegExp(filter.text);
        return Object.keys(cv).some(key => {
          if (cv[key] instanceof Array) {
            return Object.keys(cv[key]).some(subKey => {
              return searchRe.test(cv[key][subKey]);
            });
          } else {
            return searchRe.test(cv[key]);
          }
        });
      });
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
  fetchCvs: fetchCvs,
  setFilter: setVisibilityFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CvTable);
