import { Route } from 'react-router-dom';

import routes from 'routes';
import LoginPage from 'Pages/LoginPage';
import { equals, notEquals, PrivateRoute } from 'privateRoute';
import { userType } from 'store';
import RegistrationPage from 'Pages/RegistrationPage';
import ProfileEditPage from 'Pages/EditProfilePage';
import MakeAppointmentPage from 'Pages/MakeAppointmentPage';
import DoctorProcedures from 'Pages/DoctorProceduresPage';
import AppointmentsPage from 'Pages/AppointmentsPage';
import WorkPlanPage from 'Pages/WorkPlanPage';

interface privateRouteItem {
  path: string;
  children: JSX.Element;
  redirectPath: string;
  condition: () => boolean;
}

const privateRouteItems: privateRouteItem[] = [
  {
    path: routes.makeAppointment.path,
    children: <MakeAppointmentPage />,
    redirectPath: routes.logIn.path,
    condition: () => equals(userType.PATIENT),
  },
  {
    path: routes.logIn.path,
    children: <LoginPage />,
    redirectPath: routes.home.path,
    condition: () => equals(userType.GUEST),
  },
  {
    path: routes.register.path,
    children: <RegistrationPage />,
    redirectPath: routes.home.path,
    condition: () => equals(userType.GUEST),
  },
  {
    path: routes.editProfile.path,
    children: <ProfileEditPage />,
    redirectPath: routes.logIn.path,
    condition: () => notEquals(userType.GUEST),
  },
  {
    path: routes.myProcedures.path,
    children: <DoctorProcedures />,
    redirectPath: routes.logIn.path,
    condition: () => equals(userType.DOCTOR),
  },
  {
    path: routes.workPlan.path,
    children: <WorkPlanPage />,
    redirectPath: routes.logIn.path,
    condition: () => equals(userType.DOCTOR),
  },
  {
    path: routes.myAppointments.path,
    children: <AppointmentsPage />,
    redirectPath: routes.logIn.path,
    condition: () => notEquals(userType.GUEST),
  },
];

export const mappedPrivateRoutes = privateRouteItems.map(({ path, children, redirectPath, condition }, idx) => (
  <Route
    key={idx}
    path={path}
    element={
      <PrivateRoute redirectPath={redirectPath} condition={condition}>
        {children}
      </PrivateRoute>
    }
  />
));
