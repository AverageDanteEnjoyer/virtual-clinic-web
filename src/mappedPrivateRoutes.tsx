import { Route } from 'react-router-dom';

import routes from './routes';
import LoginPage from './Pages/LoginPage';
import { equals, notEquals, PrivateRoute } from './privateRoute';
import { userType } from './SessionInfoContext';
import RegistrationPage from './Pages/RegistrationPage';
import ProfileEditPage from './Pages/EditProfilePage';
import MakeAppointmentPage from './Pages/MakeAppointmentPage';

interface privateRouteItem {
  path: string;
  children: JSX.Element;
  redirectPath: string;
  condition: () => boolean;
}

const privateRouteItems: privateRouteItem[] = [
  {
    path: routes.makeAppointment,
    children: <MakeAppointmentPage />,
    redirectPath: routes.logIn,
    condition: () => equals(userType.PATIENT),
  },
  {
    path: routes.logIn,
    children: <LoginPage />,
    redirectPath: routes.home,
    condition: () => equals(userType.GUEST),
  },
  {
    path: routes.register,
    children: <RegistrationPage />,
    redirectPath: routes.home,
    condition: () => equals(userType.GUEST),
  },
  {
    path: routes.editProfile,
    children: <ProfileEditPage />,
    redirectPath: routes.logIn,
    condition: () => notEquals(userType.GUEST),
  },
];

export const mappedPrivateRoutes = privateRouteItems.map(({ path, children, redirectPath, condition }) => (
  <Route
    path={path}
    element={
      <PrivateRoute redirectPath={redirectPath} condition={condition}>
        {children}
      </PrivateRoute>
    }
  />
));
