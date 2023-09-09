import { Link } from 'react-router-dom';
import { Col, Menu, MenuProps, Row } from 'antd';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';

import routes from 'routes';
import { API_URL } from 'api';
import { Store, userType } from 'store';
import pushNotification from 'pushNotification';
import { equals, notEquals } from 'privateRoute';
import { getLocalStorageResource } from 'localStorageAPI';
import logo from 'logo.svg';

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
  const { dispatch, state } = useContext(Store);
  const [navbarState, setNavbarState] = useState(Date.now());

  useEffect(() => {
    setNavbarState(Date.now());
  }, [state.accountType]);

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
      getItem(<Link to={routes.home.path}>Home</Link>),
      getItem(<UserOutlined />, [
        getItem(<Link to={routes.editProfile.path}>Edit profile</Link>, [], () => notEquals(userType.GUEST)),
        getItem(<Link to={routes.makeAppointment.path}>Make an appointment</Link>, [], () => equals(userType.PATIENT)),
        getItem(<Link to={routes.logIn.path}>Log in</Link>, [], () => equals(userType.GUEST)),
        getItem(<Link to={routes.register.path}>Register</Link>, [], () => equals(userType.GUEST)),
        getItem(<Link to={routes.workPlan.path}>Work plan</Link>, [], () => equals(userType.DOCTOR)),
        getItem(<Link to={routes.myProcedures.path}>My procedures</Link>, [], () => equals(userType.DOCTOR)),
        getItem(<Link to={routes.myAppointments.path}>My appointments</Link>, [], () => notEquals(userType.GUEST)),
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
    <Row align="middle" justify="end" key={navbarState}>
      <Col flex={1}>
        <img src={logo} alt="Logo" height="40x" style={{ margin: '1px 0 0 1px' }} />
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
