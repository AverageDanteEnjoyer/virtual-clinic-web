import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import { QuestionOutlined, UserOutlined } from '@ant-design/icons';

import menuStyles from './Navbar.module.css';
import ComponentsRoute from '../Routes/ComponentsRoute';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  className: string = menuStyles.default_item //enables different styling for specific menu items if needed
): MenuItem {
  return {
    label,
    key,
    children,
    className,
  } as MenuItem;
}

const Navbar: React.FC = () => {
  const loggedIn = 1; //used for testing, change manually
  const items: MenuItem[] = [
    getItem(<QuestionOutlined />, 'logo', undefined, menuStyles.logo), //an area for logo
    loggedIn
      ? getItem(
          <UserOutlined />,
          'user',
          [getItem('Edit profile', '1'), getItem('Appointments', '2')],
          menuStyles.rightPanel
        )
      : getItem(
          <Link to={'log-in'}>
            <UserOutlined />
          </Link>,
          'user'
        ),
    getItem(<Link to={'/'}>home</Link>, '3'),
    getItem(<Link to={'/components'}>components</Link>, '4'),
  ];
  return (
    <BrowserRouter>
      <nav>
        <Menu
          className={menuStyles.menu}
          defaultSelectedKeys={['1']}
          mode="horizontal"
          theme="light"
          items={items}
        ></Menu>
      </nav>
      <Routes>
        <Route path={'/'}></Route>
        <Route path={'/components'} element={<ComponentsRoute />}></Route>
        <Route path={'/log-in'} element={<p>sign up</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navbar;
