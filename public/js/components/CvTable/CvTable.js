import React from 'react';
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
  TextField
} from 'material-ui';

class CvList extends React.Component {
  componentDidMount() {
    this.props.fetchCvs();
  }
  filterStore(e, newValue) {
    this.props.setFilter(newValue);
  }
  render() {
    return (
      <div className="container">
        <TextField
          floatingLabelText="Search CVs"
          onChange={this.filterStore.bind(this)}
        />
        <br />
        <Table fixedHeader={true} multiSelectable={true}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={true}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Role</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={false}
            showRowHover={false}
            stripedRows={false}
          >
            {
              this.props.cvs.length ?
                this.props.cvs.map((cv) =>
                  <TableRow
                    key={cv.id}
                    hoverable={true}
                    onRowClick={() => this.context.router.push({
                      pathname: `cv/${cv.id}`,
                      state: { cv: cv }
                    }) }
                    style={{ cursor: 'pointer' }}
                  >
                    <TableRowColumn>{cv.id}</TableRowColumn>
                    <TableRowColumn>{cv.firstname}</TableRowColumn>
                    <TableRowColumn>{cv.lastname}</TableRowColumn>
                    <TableRowColumn>{cv.role}</TableRowColumn>
                  </TableRow>
                ) :
                  <TableRow>
                    <TableRowColumn colSpan={4} style={{textAlign: 'center'}}>
                      No items found
                    </TableRowColumn>
                  </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

CvList.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default CvList;
