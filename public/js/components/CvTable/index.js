import React from 'react';
import { Link, withRouter } from 'react-router';
import {
  Dialog,
  RaisedButton,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  TextField
} from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class CvList extends React.Component {
  constructor(props) {
    super(props);
    this.filterStore = this.filterStore.bind(this);
    this.state = {
      modal: { open: false },
      selectedIds: []
    };
  }
  componentDidMount() {
    this.props.fetchCvs();
  }
  filterStore(e, newValue) {
    this.props.setFilter(newValue);
  }
  updateSelected() {
    const ctx = this;
    return function proxy(rowIndex, cellIndex) {
      if (cellIndex === -1) {
        const row = this.children.filter(obj =>
          obj.type.name === 'TableBody'
        )[0].props.children[rowIndex];
        if (ctx.state.selectedIds.includes(+row.key)) {
          const newIds = ctx.state.selectedIds.slice();
          newIds.splice(newIds.indexOf(+row.key), 1);
          ctx.setState({
            selectedIds: newIds
          });
        } else {
          ctx.setState({
            selectedIds: [...ctx.state.selectedIds, +row.key]
          });
        }
      } else {
        const cv = ctx.props.cvs[rowIndex];
        ctx.props.router.push({
          pathname: `cv/${cv.id}`,
          state: { cv }
        });
      }
    };
  }
  render() {
    const modalActions = [
      <RaisedButton
        className="pull-left"
        label="Cancel"
        primary
        onTouchTap={() => this.setState({ modal: { open: false } })}
      />,
      <RaisedButton
        label="Delete"
        secondary
        onTouchTap={() => {
          this.setState({ modal: { open: false } });
          this.props
              .deleteCvs(this.state.selectedIds)
              .then(() => {
                this.setState({
                  selectedIds: []
                });
              });
        }}
      />
    ];
    return (
      <div className="container">
        <div className="row">
          <div
            className="col-md-2"
            style={{ paddingTop: 26, paddingBottom: 10 }}
          >
            <RaisedButton
              label="Add New CV"
              containerElement={
                <Link to="cv" />
              }
            />
          </div>
          <div className="col-md-8">
            <TextField
              floatingLabelText="Search CVs"
              onChange={this.filterStore}
            />
          </div>
          <div
            className="col-md-2"
            style={{ paddingTop: 26, paddingBottom: 10 }}
          >
            {this.state.selectedIds.length ?
              <RaisedButton
                label="Delete"
                secondary
                icon={<DeleteIcon />}
                onClick={() => this.setState({ modal: { open: true } })}
              /> :
              null
            }
          </div>
        </div>
        <Table
          height={this.props.cvs.length > 10 ? '500px' : 'auto'}
          multiSelectable
          onCellClick={
            this.props.cvs.length ? this.updateSelected() : undefined
          }
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Role</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.props.cvs.length > 0}
            deselectOnClickaway={false}
            showRowHover={false}
            stripedRows={false}
          >
            {
              this.props.cvs.length ?
                this.props.cvs.map(cv =>
                  <TableRow
                    key={cv.id}
                    hoverable
                    style={{ cursor: 'pointer' }}
                  >
                    <TableRowColumn>{cv.id}</TableRowColumn>
                    <TableRowColumn>{cv.firstname}</TableRowColumn>
                    <TableRowColumn>{cv.lastname}</TableRowColumn>
                    <TableRowColumn>{cv.role}</TableRowColumn>
                  </TableRow>
                ) :
                <TableRow>
                  <TableRowColumn colSpan={4} style={{ textAlign: 'center' }} >
                    No items found
                  </TableRowColumn>
                </TableRow>
            }
          </TableBody>
        </Table>
        <Dialog
          title="This action cannot be undone"
          actions={modalActions}
          modal
          open={this.state.modal.open}
          onRequestClose={this.handleClose}
        >
          Are you sure that you want to delete selected record(s)?
        </Dialog>
      </div>
    );
  }
}

CvList.defaultProps = {
  cvs: []
};

CvList.propTypes = {
  cvs: React.PropTypes.array,
  fetchCvs: React.PropTypes.func.isRequired,
  deleteCvs: React.PropTypes.func.isRequired,
  setFilter: React.PropTypes.func.isRequired
};

export default withRouter(CvList);
