import React from "react";
import {Menu} from 'antd'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <BrowserRouter>
      <Menu>
        <Menu.Item key={1}>
          <Link to={`/`}>go to home</Link>
        </Menu.Item>
        <Menu.Item key={2}>
          <Link to={`/test`}>go to test</Link>
        </Menu.Item>
      </Menu>
      <Routes>
        <Route path="/" element={<p>home</p>}></Route>
        <Route path="/test" element={<p>test</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navbar
