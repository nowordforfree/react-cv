import React from 'react';
import {
  AutoComplete,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui';
import CvTableRow from '../CvTableRow';

export default class CvList extends React.Component {
  componentDidMount() {
    this.props.fetchCvs();
  }
  filterStore() {
    debugger
  }
  render() {
    return (
      <div className="container">
        <AutoComplete
          floatingLabelText="Search CVs"
          dataSource={this.props.cvs}
          onUpdateInput={this.filterStore.bind(this)}
        />
        <br />
        <Table selectable={false} fixedHeader={true} >
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Role</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.props.cvs.length ?
                this.props.cvs.map(cv =>
                  <CvTableRow
                    key={ cv.id }
                    data={ cv }
                    // onClick={() => this.props.fetchCvs(cv.id) }
                  />
                ) :
                <TableRow>
                  <TableRowColumn colSpan={4} style={{textAlign: 'center'}}>
                    No items
                  </TableRowColumn>
                </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}