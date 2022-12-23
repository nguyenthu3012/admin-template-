import React from 'react'
import TableCell from "@mui/material/TableCell";
import { UserModel } from '../../../Models/UserModel/UserModel';
import TableRow from "@mui/material/TableRow";
type Props = {
    user: UserModel
}

const TableDashboard = ({user}: Props) => {
    const {id, name, email, role} = user;
    const makeStyle = (role: string) => {
        if (role === 'ADMIN') {
            return {
                background: 'rgb(145 254 159 / 47%)',
                color: 'green',
            }
        }
        else if (role === 'USER') {
            return {
                background: '#ffadad8f',
                color: 'red',
            }
        }

    }
    return (
        <TableRow
            key={id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {id}
            </TableCell>
            <TableCell align="left">{name}</TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="left">
                <span className="status" style={makeStyle(role)}>{role}</span>
            </TableCell>
        </TableRow>
    )
}

export default TableDashboard