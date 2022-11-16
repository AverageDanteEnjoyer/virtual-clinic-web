import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to={`/`}>go to home</Link>
          </li>
          <li>
            <Link to={`/test`}>go to test</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<p>home</p>}></Route>
        <Route path="/test" element={<p>test</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navbar