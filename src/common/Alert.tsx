import React from 'react';
import {Alert} from 'antd';

const AlertBox: React.FC = () => (
    <Alert
        message={"This site uses cookies to enhance the user experience."}
        type={"info"}
        showIcon={true}
        closable
    />
);

export default AlertBox;
