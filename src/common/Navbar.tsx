import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {
  Menu,
  MenuProps,
} from "antd";
import {
  QuestionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import menuStyles from './Navbar.module.css'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  className:string=menuStyles.default_item, //enables different styling for specific menu items if needed
): MenuItem {
  return {
    label,
    key,
    children,
    className,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<QuestionOutlined/>, 'logo', undefined, menuStyles.logo), //an area for logo
  getItem(<UserOutlined/>, 'user',[
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
  ]),
  getItem(<Link to={'/'}>home</Link>, '3'),
  getItem(<Link to={'/test'}>test</Link>, '4'),
];

const Navbar: React.FC = () => {
  return (
    <div style={{ height: 256}}>
      <BrowserRouter>
        <nav>
          <Menu
            style={{display:"block"}}
            defaultSelectedKeys={['1']}
            mode="horizontal"
            theme="light"
            items={items}>
          </Menu>
        </nav>
        <Routes>
          <Route path={'/'} element={<p>home</p>}></Route>
          <Route path={'/test'} element={<p>test</p>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Navbar;
