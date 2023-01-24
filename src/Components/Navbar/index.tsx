import { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Col, Menu, MenuProps, Row } from 'antd';
import { QuestionOutlined, UserOutlined } from '@ant-design/icons';

import routes from '../../routes';
import { clearLocalStorage, getLocalStorageResource } from '../../localStorageAPI';
import { SessionInfoContext, userType } from '../../SessionInfoContext';
import { API_URL } from '../../api';
import { equals, notEquals } from '../../privateRoute';

type MenuItem = Required<MenuProps>['items'][number];

let keyCounter: number = 0;

function getItem(label: ReactNode, children?: MenuItem[], condition: () => boolean = () => true): MenuItem | null {
  if (!condition()) return null;

  return {
    key: keyCounter++,
    label,
    children,
  };
}

const Navbar = () => {
  const { setAccountType } = useContext(SessionInfoContext);

  const logOut = async () => {
    const token = getLocalStorageResource('token');
    if (!token) return;
    await fetch(`${API_URL}/users/sign_out/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    clearLocalStorage();
    setAccountType(userType.GUEST);
  };

  const getMenuItems = (): MenuItem[] => {
    const items: MenuItem[] | null = [
      getItem(<Link to={routes.components}>components</Link>),
      getItem(<Link to={routes.home}>home</Link>),
      getItem(<Link to={routes.makeAppointment}>Make an appointment</Link>, undefined, () => equals(userType.PATIENT)),
      getItem(<UserOutlined />, [
        getItem(<Link to={routes.logIn}>Log in</Link>, undefined, () => equals(userType.GUEST)),
        getItem(<Link to={routes.register}>Register</Link>, undefined, () => equals(userType.GUEST)),
        getItem(<Link to={routes.editProfile}>Edit profile</Link>, undefined, () => notEquals(userType.GUEST)),
        getItem('Appointments', undefined, () => notEquals(userType.GUEST)),
        getItem(
          <Link to={routes.home} onClick={logOut}>
            Log out
          </Link>,
          undefined,
          () => notEquals(userType.GUEST)
        ),
      ]),
    ];

    return items.filter((item) => item !== null);
  };

  return (
    <Row align="middle" justify="end">
      <Col flex={1}>
        {/*A place for logo*/}
        <QuestionOutlined />
      </Col>
      <Col>
        <nav>
          <Menu defaultSelectedKeys={['2']} mode="horizontal" theme="light" items={getMenuItems()} />
        </nav>
      </Col>
    </Row>
  );
};

export default Navbar;
