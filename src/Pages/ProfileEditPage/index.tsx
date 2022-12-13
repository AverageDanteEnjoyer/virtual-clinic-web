import ProfileEditForm from '../../Containers/ProfileEditForm';
import Navbar from '../../Components/Navbar';
import { StyledTitle } from '../../Components/Typography/styles';

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
