import LoginForm from '../../Containers/LoginForm';
import Navbar from '../../Components/Navbar';
import useTitle from '../../useTitle';

const LoginPage = () => {
  useTitle();
  
  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
};

export default LoginPage;
