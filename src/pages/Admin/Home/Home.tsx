// library
import React, { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts';
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimateSharedLayout } from "framer-motion";
// css
import './Home.css'
// data
import { cardsData, data, options } from '../../../assets/Data/Data';
// model
import { UserModel } from '../../../Models/UserModel/UserModel';
//component
import TableDashboard from '../../../components/Admin/TableDashboard/TableDashboard';
// redux
import { AppDispatch, RootState } from '../../../redux/configureStore';
import { getAllUserApi } from '../../../redux/userReducer/userReducer';
import { getPositionApi } from '../../../redux/positionReducer/positionReducer';

type Props = {}

const Home = (props: Props) => {
  const dispatch: AppDispatch = useDispatch()

  const { users } = useSelector((state: RootState) => state.users)
  const { positions } = useSelector((state: RootState) => state.positions)

  useEffect(() => {
    dispatch(getAllUserApi())
  }, [])

  useEffect(() => {
    dispatch(getPositionApi())
  }, [])
  return (
    <div className='homeDash'>
      <div className="MainDash">
        <h1>Dashboard</h1>
        {/* ==================== CARD =================== */}
        <div className="cards">
          {cardsData.map((card, id) => {
            const Png = card.png
            return (
              <div className="parentContainer" key={id}>
                <AnimateSharedLayout>
                  <motion.div
                    className="compactCard"
                    style={{
                      background: card.color.backGround,
                      boxShadow: card.color.boxShadow,
                    }}
                    layoutId="expandableCard"
                  >
                    <div className="radialBar">
                      <span>{card.title}</span>
                    </div>
                    <div className="detail">
                      <Png />
                      <span>${card.value}</span>
                      <span>Last 24 hours</span>
                    </div>
                  </motion.div>
                </AnimateSharedLayout>
              </div>
            );
          })}
        </div>

        {/* ========================= TABLE ======================  */}
        <div className="Table">
          <h3>New Users</h3>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {users.slice(-5).map((user: UserModel) =>
                (
                  <TableDashboard user={user} key={user.id} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {/* ============================== RIGHT SIDE ======================  */}
      <div className="rightSide">
        <div>
          <h3>Recent Position</h3>
          <div className="Updates">
            {positions.slice(-3).map((pos) => {
              return (
                <div className="update" key={pos.hinhAnh}>
                  <img src={pos.hinhAnh} alt="profile" />
                  <div className="noti">
                    <div style={{ marginBottom: '0.5rem' }}>
                      <span>{pos.tenViTri}</span>
                    </div>
                    <div className="des">
                      <span> {pos.tinhThanh}</span> -
                      <span>{pos.quocGia}</span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3>All Review</h3>
          <div className="CustomerReview">
            <ReactApexChart options={options} series={data.series} type="area" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home