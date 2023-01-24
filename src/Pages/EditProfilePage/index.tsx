import ProfileEditForm from '../../Containers/EditProfileForm';
import { StyledTitle } from '../../Components/Typography/styles';
import Navbar from '../../Components/Navbar';

const ProfileEditPage = () => {
  return (
    <>
      <Navbar />
      <StyledTitle>Profile edit</StyledTitle>
      <ProfileEditForm />
    </>
  );
};

export default ProfileEditPage;
