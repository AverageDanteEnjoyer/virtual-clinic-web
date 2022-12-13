import Navbar from '../../Components/Navbar';
import ProfessionSelector from '../../Containers/ProfessionSelector';
import EditProfileForm from '../../Containers/EditProfileForm';

const DoctorEditProfilePage = () => {
  return (
    <>
      <Navbar />
      <EditProfileForm />
      <ProfessionSelector />
    </>
  );
};

export default DoctorEditProfilePage;
