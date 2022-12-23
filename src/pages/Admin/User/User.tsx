import React, { useEffect, useState } from 'react'
import { TableContainer, TablePagination, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material'
import './user.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MainTable from '../../../components/Admin/MainTable/MainTableUser'
import { AppDispatch, RootState } from '../../../redux/configureStore'
import { UserModel } from '../../../Models/UserModel/UserModel'
import { getAllUserApi, getAllUserPaginationApi, searchUserApi } from '../../../redux/userReducer/userReducer'
import TableHeader from '../../../components/Admin/TableHeader/TableHeader'
type Props = {}

const User = (props: Props) => {

  const dispatch: AppDispatch = useDispatch()
  const { usersPagination, users } = useSelector((state: RootState) => state.users)

  // search value
  const [search, setSearch] = useState('');

  // array users
  const [allUser, setAllUser] = useState<UserModel[]>([]);

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

  // handle search by name - call api
  const handleSearch = () => {
    dispatch(searchUserApi(search))
  }

  // handle search by name - input search
  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Kiểm tra gía trị nhập nhập có bao gồm trong tên sản phẩm hay không
    const searchedUsers = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearch(value)
    setAllUser(searchedUsers)
  };

  // xử lý hiển thị trang theo cột
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setAllUser(users);
  }, [users]);

  useEffect(() => {
    dispatch(getAllUserPaginationApi(page + 1, rowsPerPage))
  }, [page, rowsPerPage, users]);


  return (
    <div className='userDash'>
      <h1>Users</h1>

      <div className='userDash-header'>
        <div className="search">
          <input value={search} onChange={handleInputSearch} type="text" name="" id="" placeholder="Write something" className="search__input" />
          <Link to={`/users/search/${search}`} onClick={handleSearch} type="submit" className="search__button" tabIndex={-1}>Search</Link>
        </div>
        <Link className='userDash-button--create' to={'/create-user'}>Create</Link>
      </div>
      <Paper sx={{ width: '100%' }}>
        <TableContainer
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          sx={{ maxHeight: 450 }}

        >
          <Table sx={{ minWidth: 650 }} size='small' stickyHeader aria-label="simple table" >
            <TableHeader lable={['User ID', 'Image', 'Username', 'Birthday', 'Gender', 'Email', 'Role', '']} />
            <TableBody style={{ color: "white" }}>
              {
                search.length == 0 ? usersPagination.map((data: UserModel) =>
                (
                  <MainTable data={data} key={data.id} />
                )) : allUser.map((data: UserModel) =>
                (
                  <MainTable data={data} key={data.id} />
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
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: users.length - 1 }]}
              colSpan={3}
              count={users.length}
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