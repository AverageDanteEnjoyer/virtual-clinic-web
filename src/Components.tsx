import React from "react";
import Spinner from "./common/Spinner";
import AppointmentTable from "./common/AppointmentTable";
import { Alert, Typography, Button, Space, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

import {} from "antd";
const { Title, Paragraph } = Typography;

const content1: string =
  "In the process of internal desktop applications development, many different design specs and\n" +
  "            implementations would be involved, which might cause designers and developers difficulties and\n" +
  "            duplication and reduce the efficiency of development.";

const content2: string =
  "After massive project practice and summaries, Ant Design, a design language for background\n" +
  "            applications, is refined by Ant UED Team, which aims to\n" +
  "            uniform the user interface specs for internal background projects, lower the unnecessary\n" +
  "            cost of design differences and implementation and liberate the resources of design and\n" +
  "            front-end development.";

const buttonContent: string = "Click me!";

const Components: React.FC = () => {
  return (
    <div className="wrapper">
      <AppointmentTable></AppointmentTable>
      <Spinner size={26}></Spinner>
      <Alert
        message={"This site uses cookies to enhance the user experience."}
        type={"info"}
        showIcon={true}
        closable
      />
      <Typography>
        <Title level={1} underline={true}>
          Introduction
        </Title>
        <Paragraph strong={true} copyable={{ text: content1, tooltips: true }}>
          {content1}
        </Paragraph>

        <Paragraph strong={true} copyable={{ text: content2, tooltips: true }}>
          {content2}
        </Paragraph>
      </Typography>

      <Space wrap>
        <Button type="primary">{buttonContent}</Button>
      </Space>

      <>
        <Input
          size="large"
          placeholder="enter email"
          prefix={<UserOutlined />}
        />
      </>
    </div>
  );
};

export default Components;
