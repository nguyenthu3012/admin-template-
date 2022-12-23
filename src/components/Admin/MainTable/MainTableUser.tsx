import React, { useEffect } from 'react'
import './mainTableUser.css'
import { TableRow, TableCell } from '@mui/material'
import { UserModel } from '../../../Models/UserModel/UserModel'
import profile from '../../../assets/imgs/profile.png'
import {DeleteOutline, Settings} from '@mui/icons-material/';
import { AppDispatch, RootState } from '../../../redux/configureStore'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserByIdApi, getAllUserApi } from '../../../redux/userReducer/userReducer'
import { Link } from 'react-router-dom'
import { RoomModel } from '../../../Models/RoomModel/RoomModel'
type Props = {
    data: UserModel
}

const MainTable = ({ data }: Props) => {
    const { id, name, avatar, birthday, gender, email, role} = data
    const dispatch: AppDispatch = useDispatch()

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
    const makeStyleGender = (gender: boolean) => {
        if (gender) {
            return {
                background: '#91d9ff',
                color: 'blue',
            }
        }
        else {
            return {
                background: '#FF919D',
                color: 'rgb(212, 83, 98',
            }
        }
    }

    const handleDelete = () => {
        dispatch(deleteUserByIdApi(id))
    }

    return (
        <TableRow
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {id}
            </TableCell>
            <TableCell align="left">
                <img className='mainTableImage' src={avatar ? avatar : profile} alt="" />
            </TableCell>
            <TableCell align="left">{name}</TableCell>
            <TableCell align="left">{birthday}</TableCell>
            <TableCell align="left">
                <span className='gender' style={makeStyleGender(gender)}> 
                {gender ? 'Male' : 'Female'}
                </span>
            </TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="left">
                <span className="status" style={makeStyle(role)}> {role}</span>
            </TableCell>
            <TableCell align="left">
                <span onClick={handleDelete} className="deleteIcon"><DeleteOutline className='icon'/> </span>
                <Link to={`/users/${id}`} className="updateIcon">
                    
                    <Settings className='icon'/> 
                    </Link>
            </TableCell>
        </TableRow>
    )
}

export default MainTable