import { useContext, useEffect } from 'react';

import LoginForm from '../../Containers/LoginForm';
import Navbar from '../../Components/Navbar';
import { TitleContext } from '../../Contexts/TitleContext';

const LoginPage = () => {
  const { updateTitle } = useContext(TitleContext);

  useEffect(() => {
    updateTitle('Login');
  }, [updateTitle]);

  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
};

export default LoginPage;
