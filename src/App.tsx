import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Admin/Home/Home';
import RoomList from './pages/Admin/Rooms/RoomList/RoomList';
import User from './pages/Admin/User/User';
import UserCreate from './pages/Admin/UserCreate/UserCreate';
import UserEdit from './pages/Admin/UserEdit/UserEdit';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
      <Routes>
        <Route path=''  element={<AdminTemplate />}>
          <Route index  element={<Home />}/>
          <Route path='users' element={<User />}>
            <Route path='search/:TenNguoiDung' element={<User />}/>
          </Route>
          <Route path='users/:id' element={<UserEdit />} />
          <Route path='create-user' element={<UserCreate />}/>
          <Route path='rooms' element={<RoomList />} />

        </Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
