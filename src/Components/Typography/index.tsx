import { ParagraphProps } from 'antd/es/typography/Paragraph';
import { TitleProps } from 'antd/es/typography/Title';

import { StyledParagraph, StyledTitle, StyledTypography } from './styles';

interface ExtendedTitleProps extends TitleProps {
  centered?: boolean;
}

export const Title = ({ children, centered, ...rest }: ExtendedTitleProps) => (
  <StyledTitle {...rest} centered={!!centered}>
    {children}
  </StyledTitle>
);

export const Paragraph = ({ children, ...rest }: ParagraphProps) => (
  <StyledParagraph {...rest}>{children}</StyledParagraph>
);

export const Typography = ({ children, ...rest }: any) => <StyledTypography {...rest}>{children}</StyledTypography>;
