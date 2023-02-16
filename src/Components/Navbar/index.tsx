import { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Col, Menu, MenuProps, Row } from 'antd';
import { QuestionOutlined, UserOutlined } from '@ant-design/icons';

import routes from 'routes';
import { getLocalStorageResource } from 'localStorageAPI';
import { Store, userType } from 'store';
import { API_URL } from 'api';
import { equals, notEquals } from 'privateRoute';
import pushNotification from 'pushNotification';

type MenuItem = Required<MenuProps>['items'][number];

let keyCounter: number = 0;

function getItem(label: ReactNode, children?: MenuItem[], condition: () => boolean = () => true): MenuItem | null {
  if (!condition()) return null;

  return {
    key: keyCounter++,
    label,
    children: children?.length ? children : undefined,
  };
}

const Navbar = () => {
  const { dispatch } = useContext(Store);

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

    pushNotification('success', 'Logout Success', 'You have been logged out.');
    dispatch({ type: 'logout' });
  };

  const getMenuItems = (): MenuItem[] => {
    const items: MenuItem[] | null = [
      getItem(<Link to={routes.components.path}>Components</Link>),
      getItem(<Link to={routes.home.path}>Home</Link>),
      getItem(<Link to={routes.makeAppointment.path}>Make an appointment</Link>, [], () => equals(userType.PATIENT)),
      getItem(<UserOutlined />, [
        getItem(<Link to={routes.logIn.path}>Log in</Link>, [], () => equals(userType.GUEST)),
        getItem(<Link to={routes.register.path}>Register</Link>, [], () => equals(userType.GUEST)),
        getItem(<Link to={routes.editProfile.path}>Edit profile</Link>, [], () => notEquals(userType.GUEST)),
        getItem('Appointments', [], () => equals(userType.PATIENT)),
        getItem(<Link to={routes.myProcedures.path}>My procedures</Link>, [], () => equals(userType.DOCTOR)),
        getItem(
          <Link to={routes.home.path} onClick={logOut}>
            Log out
          </Link>,
          [],
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
