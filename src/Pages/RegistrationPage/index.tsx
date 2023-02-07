import RegistrationForm from '../../Containers/RegistrationForm';
import Navbar from '../../Components/Navbar';
import useTitle from '../../useTitle';

const RegistrationPage = () => {
  useTitle();
  
  return (
    <>
      <Navbar />
      <RegistrationForm />
    </>
  );
};

export default RegistrationPage;
