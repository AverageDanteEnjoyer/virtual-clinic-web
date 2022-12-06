import { ReactNode, Key, useContext, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Col, Menu, MenuProps, Row } from 'antd';
import { QuestionOutlined, UserOutlined } from '@ant-design/icons';
import jwtDecode from 'jwt-decode';
import routes from '../../routes';
import { getToken, removeToken } from '../../tokenApi';
import { SessionInfoContext } from '../../SessionInfoContext';
import { API_URL } from '../../api';

import ComponentsPage from '../../Pages/ComponentsPage';
import RegistrationPage from '../../Pages/RegistrationPage';
import LoginPage from '../../Pages/LoginPage';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: ReactNode, key: Key, children?: MenuItem[]): MenuItem {
  return {
    label,
    key,
    children,
  } as MenuItem;
}

const Navbar = () => {
  const { isLogged, setIsLogged } = useContext(SessionInfoContext);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const tokenDecoded = jwtDecode<{ exp: number }>(token);
    const exp_date = new Date(0);
    exp_date.setUTCSeconds(tokenDecoded.exp);

    if (exp_date < new Date()) {
      removeToken(); //removes token from localStorage when it expires
    } else {
      setIsLogged(true);
    }
  }, []);

  const logOut = async () => {
    const token = getToken();
    if (!token) return;
    await fetch(`${API_URL}/users/sign_out/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    removeToken();
    setIsLogged(false);
  };

  const items: MenuItem[] = [
    getItem(<Link to={routes.components}>components</Link>, '1'),
    getItem(<Link to={routes.home}>home</Link>, '2'),
    getItem(
      <UserOutlined />,
      'user',
      isLogged
        ? [
            getItem('Edit profile', '3'),
            getItem('Appointments', '4'),
            getItem(
              <Link to={routes.home} onClick={logOut}>
                log out
              </Link>,
              '5'
            ),
          ]
        : [
            getItem(<Link to={routes.logIn}>log in</Link>, '3'),
            getItem(<Link to={routes.register}>register</Link>, '4'),
          ]
    ),
  ];
  return (
    <BrowserRouter>
      <Row align="middle" justify="end">
        <Col flex={1}>
          {/*A place for logo*/}
          <QuestionOutlined />
        </Col>
        <Col>
          <nav>
            <Menu defaultSelectedKeys={['2']} mode="horizontal" theme="light" items={items} />
          </nav>
        </Col>
      </Row>
      <Routes>
        <Route path={routes.home}></Route>
        <Route path={routes.components} element={<ComponentsPage />}></Route>
        <Route path={routes.logIn} element={<LoginPage />} />
        <Route path={routes.register} element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navbar;
