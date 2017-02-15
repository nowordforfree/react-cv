import React from 'react';
import Topbar from '../Topbar';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

class Root extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.signedIn !== nextProps.signedIn) {
      const { router } = this.props;
      const location = this.props.signedIn ? 'login' : '/';
      router.push(location);
    }
  }
  render() {
    const style = {
      minHeight: 200,
      margin: 20,
      paddingTop: 15,
      paddingBottom: 40,
      textAlign: 'center'
    };
    return (
      <div>
        { this.props.showSpinner ? <Spinner/> : null }
        <Topbar router={this.props.router} />
        <Paper style={style} zDepth={1}>
          { this.props.children }
        </Paper>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  showSpinner: (state.auth.isFetching || state.cvs.isFetching ),
  signedIn: state.auth.signedIn
});

export default connect(mapStateToProps)(Root);