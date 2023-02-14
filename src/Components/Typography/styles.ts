import styled from 'styled-components';
import { Typography } from 'antd';

import palette from 'palette';

const { Title, Paragraph } = Typography;

export const StyledTypography = styled(Typography)`
  width: 100%;
  font-family: CircularStd, sans-serif;
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const StyledTitle = styled(Title)<{ center?: string }>`
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  font-size: 24px;
  font-weight: 600;

  &.ant-typography {
    color: ${palette.russianViolet};
  }
`;

export const StyledParagraph = styled(Paragraph)`
  text-align: justify;
  line-height: 30px;

  &.ant-typography {
    color: ${palette.russianViolet};
  }
`;
