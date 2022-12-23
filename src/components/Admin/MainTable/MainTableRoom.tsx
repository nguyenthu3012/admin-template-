import React, { useEffect } from 'react'
import './mainTableUser.css'
import { TableRow, TableCell } from '@mui/material'
import { DeleteOutline, Settings, Visibility } from '@mui/icons-material/';
import { AppDispatch } from '../../../redux/configureStore'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { RoomModel } from '../../../Models/RoomModel/RoomModel'
type Props = {
    data: RoomModel
}

const MainTableRoom = ({ data }: Props) => {
    const { id, tenPhong, khach, giaTien, moTa, hinhAnh } = data
    const dispatch: AppDispatch = useDispatch()

    const makeStyle = (price: number) => {
        if (price > 20) {
            return {
                background: 'rgb(145 254 159 / 47%)',
                color: 'green',
            }
        }
        else if (price < 20) {
            return {
                background: '#ffadad8f',
                color: 'red',
            }
        }
    }

    const handleDelete = () => {
        // dispatch(deleteUserByIdApi(id))
    }

    return (
        <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {id}
            </TableCell>
            <TableCell align="left">
                <div className='roomImage'>
                    <img className='mainTableImage ' src={hinhAnh ? hinhAnh : ''} alt="" />

                </div>
            </TableCell>
            <TableCell align="left">{tenPhong.length > 20 ? tenPhong.substring(0, 20) + '...' : tenPhong}</TableCell>
            <TableCell align="left">{khach}</TableCell>
            <TableCell align="left">{moTa.length > 20 ? moTa.substring(0, 20) + '...' : moTa}</TableCell>
            <TableCell align="left">
                <span className="status" style={makeStyle(giaTien)}> $ {giaTien}</span>
            </TableCell>
            <TableCell align="left">
                <span onClick={handleDelete} className="deleteIcon"><DeleteOutline className='icon' /> </span>
                <Link to={`/users/${id}`} className="updateIcon">

                    <Settings className='icon' />
                </Link>
                <span className="showIcon"><Visibility className='icon' /> </span>

            </TableCell>
        </TableRow>
    )
}

export default MainTableRoom