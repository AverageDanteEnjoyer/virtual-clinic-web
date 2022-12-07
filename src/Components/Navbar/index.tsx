import { Key, ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Col, Menu, MenuProps, Row } from 'antd';
import { QuestionOutlined, UserOutlined } from '@ant-design/icons';

import routes from '../../routes';
import { getToken, removeToken } from '../../tokenApi';
import { SessionInfoContext } from '../../SessionInfoContext';
import { API_URL } from '../../api';

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
            getItem(<Link to={routes.editProfile}>edit profile</Link>, '3'),
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
  );
};

export default Navbar;
