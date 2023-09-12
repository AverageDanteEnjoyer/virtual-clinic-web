import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

import routes from 'routes';
import { equals, notEquals, PrivateRoute } from 'privateRoute';
import { userType } from 'store';

import FullPageLoader from 'Components/FullPageLoader';
const LoginPage = lazy(() => import('Pages/LoginPage'));
const RegistrationPage = lazy(() => import('Pages/RegistrationPage'));
const ProfileEditPage = lazy(() => import('Pages/EditProfilePage'));
const MakeAppointmentPage = lazy(() => import('Pages/MakeAppointmentPage'));
const DoctorProcedures = lazy(() => import('Pages/DoctorProceduresPage'));
const AppointmentsPage = lazy(() => import('Pages/AppointmentsPage'));
const WorkPlanPage = lazy(() => import('Pages/WorkPlanPage'));

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
        <Suspense fallback={<FullPageLoader />}>{children}</Suspense>
      </PrivateRoute>
    }
  />
));
