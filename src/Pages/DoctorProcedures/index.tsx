import DoctorManageProcedures from '../../Containers/DoctorManageProcedures';
import Navbar from '../../Components/Navbar';
import { StyledTitle } from '../../Components/Typography/styles';

const DoctorProcedures = () => {
  return (
    <>
      <Navbar />
      <StyledTitle center={'center'}>Doctor procedures</StyledTitle>
      <DoctorManageProcedures />
    </>
  );
};

export default DoctorProcedures;
