import { useContext } from 'react';

import LoginForm from '../../Containers/LoginForm';
import Navbar from '../../Components/Navbar';
import { TitleContext } from '../../Contexts/TitleContext';

const LoginPage = () => {
  const { updateTitle } = useContext(TitleContext);

  updateTitle('Virtual Clinic - Login');

  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
};

export default LoginPage;
