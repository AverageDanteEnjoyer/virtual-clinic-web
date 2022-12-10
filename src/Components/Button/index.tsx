import { StyledButton } from './styles';
import { ButtonProps } from 'antd';

interface CustomButtonProps extends ButtonProps {}

const Button = ({
  type = 'primary',
  className,
  disabled,
  children,
  shape = 'round',
  htmlType,
  size,
  loading,
  onClick,
}: CustomButtonProps) => (
  <StyledButton
    className={className}
    type={type}
    disabled={disabled}
    shape={shape}
    htmlType={htmlType}
    size={size}
    loading={loading}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

export default Button;
