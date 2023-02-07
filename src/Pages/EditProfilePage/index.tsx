import ProfileEditForm from '../../Containers/EditProfileForm';
import { StyledTitle } from '../../Components/Typography/styles';
import Navbar from '../../Components/Navbar';
import useTitle from '../../useTitle';

const ProfileEditPage = () => {
  useTitle();
  
  return (
    <>
      <Navbar />
      <StyledTitle center="true">Profile edit</StyledTitle>
      <ProfileEditForm />
    </>
  );
};

export default ProfileEditPage;
