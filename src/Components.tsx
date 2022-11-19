import React from "react";
import Spinner from "./common/Spinner";
import AppointmentTable from "./common/AppointmentTable";

const Components:React.FC = () =>{
  return(
    <div className='wrapper'>
      <AppointmentTable></AppointmentTable>
      <Spinner size={26}></Spinner>
    </div>
  );
}

export default Components
