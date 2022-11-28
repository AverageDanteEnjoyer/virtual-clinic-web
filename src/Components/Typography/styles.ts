import styled from 'styled-components';
import { Typography } from 'antd';

import colors from '../../palette';

const { Title, Paragraph } = Typography;

const StyledTypography = styled(Typography)`
  width: 100%;
  font-family: CircularStd, sans-serif;
  border: 2px solid ${colors.black};
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin-top: 14px;
`;

const StyledParagraph = styled(Paragraph)`
  text-align: justify;
  line-height: 30px;
`;

export { StyledTypography, StyledTitle, StyledParagraph };
