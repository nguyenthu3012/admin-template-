import React, { useState } from "react";
import "./sidebar.css";
import Logo from '../../../assets/imgs/logo.png'
import { SidebarData } from '../../../assets/Data/Data';
import {Dns, LoginOutlined, RoundaboutRightOutlined} from '@mui/icons-material';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getStorageJson, USER_LOGIN } from "../../../util/config";

const Sidebar = () => {
  const [selected, setSelected] = useState<number>(0);

  const [expanded, setExpaned] = useState<boolean>(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  const user = getStorageJson(USER_LOGIN)

  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <Dns />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768 ?`${expanded}`: ''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          Hello! <span>{user ? user.name : 'ADMIN'}</span>
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <Link to={`${item.path}`}
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </Link>
          );
        })}
        {/* signoutIcon */}
        <Link to={'/login'} className={`${user ? 'visible' : ''} menuItem`}>
          <LoginOutlined />
          <span>Login</span>
        </Link>
        <div className={`${user ? '' : 'visible'} menuItem`}>
          <RoundaboutRightOutlined />
          <span>Sign out</span>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
