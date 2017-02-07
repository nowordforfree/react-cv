import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui';

export default (props) => (
  <TableRow key={props.data.id} onRowClick={props.onClick} style={{ cursor: 'pointer' }}>
    <TableRowColumn>{props.data.id}</TableRowColumn>
    <TableRowColumn>{props.data.firstname}</TableRowColumn>
    <TableRowColumn>{props.data.lastname}</TableRowColumn>
    <TableRowColumn>{props.data.role}</TableRowColumn>
  </TableRow>
);