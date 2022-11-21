import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ComponentsRoute from './ComponentsRoute';

const AppRoutes = (
  <Routes>
    <Route path={'/'}></Route>
    <Route path={'/Components'} element={<ComponentsRoute />}></Route>
    <Route path={'/log-in'} element={<p>sign up</p>}></Route>
  </Routes>
);

export default AppRoutes;
