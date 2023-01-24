import { useContext, useEffect } from 'react';

import RegistrationForm from '../../Containers/RegistrationForm';
import Navbar from '../../Components/Navbar';
import { TitleContext } from '../../Contexts/TitleContext';

const RegistrationPage = () => {
  const { updateTitle } = useContext(TitleContext);

  useEffect(() => {
    updateTitle('Virtual Clinic - Registration');
  }, [updateTitle]);

  return (
    <>
      <Navbar />
      <RegistrationForm />
    </>
  );
};

export default RegistrationPage;
