import useTitle from 'Hooks/useTitle';

import Navbar from 'Components/Navbar';

const HomePage = () => {
  useTitle();

  return <Navbar />;
};

export default HomePage;
