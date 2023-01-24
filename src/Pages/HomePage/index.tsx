import { useContext } from 'react';

import Navbar from '../../Components/Navbar';
import { TitleContext } from '../../Contexts/TitleContext';

const HomePage = () => {
  const { updateTitle } = useContext(TitleContext);

  updateTitle('Virtual Clinic');

  return <Navbar />;
};

export default HomePage;
