import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import palette from '../../palette';

export const DoctorIcon = styled(UserOutlined)`
  color: #1890ff;
  font-size: 36px;
`;

export const DoctorOption = styled(Row)`
  cursor: pointer;
  width: 100%;
`;

export const DoctorInfo = styled(Col)`
  margin-left: 8px;
`;

export const Paragraph = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  height: 18px;
  width: 100%;
  line-height: 20px;
  color: ${palette.deepViolet};
`;

export const DoctorEmail = styled(Paragraph)`
  font-size: 14px;
  font-weight: 400;
  height: 16px;
  width: 100%;
  color: ${palette.sonicSilver};
`;
