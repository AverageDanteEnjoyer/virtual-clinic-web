import React from "react";
import Spinner from "./common/Spinner";
import AppointmentTable from "./common/AppointmentTable";
import AlertBox from "./common/Alert";
import TypographyArea from "./common/Typography";

const Components: React.FC = () => {
    return (
        <div className='wrapper'>
            <AppointmentTable></AppointmentTable>
            <Spinner size={26}></Spinner>
            <AlertBox></AlertBox>
            <TypographyArea></TypographyArea>
        </div>
    );
}

export default Components
