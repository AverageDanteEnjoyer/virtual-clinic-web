import { useContext } from 'react';

import ProfileEditForm from '../../Containers/EditProfileForm';
import { StyledTitle } from '../../Components/Typography/styles';
import Navbar from '../../Components/Navbar';
import { TitleContext } from '../../Contexts/TitleContext';

const ProfileEditPage = () => {
  const { updateTitle } = useContext(TitleContext);

  updateTitle('Profile edit');

  return (
    <>
      <Navbar />
      <StyledTitle>Profile edit</StyledTitle>
      <ProfileEditForm />
    </>
  );
};

export default ProfileEditPage;
