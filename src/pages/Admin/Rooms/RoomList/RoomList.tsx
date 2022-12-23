import React, { useEffect, useState } from 'react'
import { TableContainer, TablePagination, Table, TableRow, TableBody, Paper } from '@mui/material'
import './roomList.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/configureStore'
import { getAllRoomApi, getRoomPagApi } from '../../../../redux/roomReducer/roomReducer'
import TableHeader from '../../../../components/Admin/TableHeader/TableHeader'
import { RoomModel } from '../../../../Models/RoomModel/RoomModel'
import MainTableRoom from '../../../../components/Admin/MainTable/MainTableRoom'
type Props = {}

const User = (props: Props) => {

    const dispatch: AppDispatch = useDispatch()
    const { rooms, roomPagination } = useSelector((state: RootState) => state.rooms)

    console.log(roomPagination)
    // set page mặc định bằng 0 tương ứng với trang 1
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    // xử lý thay đổi trang
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    // xử lý hiển thị trang theo cột
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        dispatch(getRoomPagApi(page + 1, rowsPerPage))
    }, [page, rowsPerPage]);

    useEffect(() => {
        dispatch(getAllRoomApi())
    }, [])


    return (
        <div className='room'>

            <div className='room-header'>
                <h1>Room List</h1>
                <div className="room-header-container">

                    <Link className='room-button--create' to={''}>Create</Link>
                </div>
            </div>
            <Paper sx={{ width: '100%' }}>
                <TableContainer
                    style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                    sx={{ maxHeight: 450 }}

                >
                    <Table sx={{ minWidth: 650 }} size='small' stickyHeader aria-label="simple table" >
                        <TableHeader lable={['ID', 'Image', 'Name', 'Guests', 'Description', 'Price', '']} />
                        <TableBody style={{ color: "white" }}>
                            {
                                roomPagination?.map((data: RoomModel) =>
                                (
                                    <MainTableRoom data={data} key={data.id} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Table className='pagination'>
                <TableBody>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: rooms.length - 1 }]}
                            colSpan={3}
                            count={rooms.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableBody>
            </Table>

        </div>
    )
}

export default User