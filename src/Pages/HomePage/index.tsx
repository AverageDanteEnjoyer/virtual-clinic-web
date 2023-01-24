import { useContext, useEffect } from 'react';

import Navbar from '../../Components/Navbar';
import { TitleContext } from '../../Contexts/TitleContext';

const HomePage = () => {
  const { updateTitle } = useContext(TitleContext);

  useEffect(() => {
    updateTitle('Virtual Clinic');
  }, [updateTitle]);

  return <Navbar />;
};

export default HomePage;
