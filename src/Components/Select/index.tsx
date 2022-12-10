import { SelectProps } from 'antd';

import { StyledSelect } from './styles';

interface StyledSelectProps extends SelectProps {
  customOptions?: {
    label: string;
    children: { label: string; value: string; disabled?: boolean; className?: string }[];
  }[];
  onChange?: any;
}

const Select = ({
  customOptions,
  defaultValue,
  mode,
  options,
  placeholder,
  className,
  onChange,
  dropdownRender,
  showArrow,
  children,
}: StyledSelectProps) => {
  const { Option, OptGroup } = StyledSelect;
  const groups = customOptions?.map(({ children, label }) => {
    const options = children.map(({ className, value, label }) => (
      <Option className={className} key={value} value={value}>
        {label}
      </Option>
    ));
    return (
      <OptGroup key={label} label={label}>
        {options}
      </OptGroup>
    );
  });
  return (
    <StyledSelect
      mode={mode}
      defaultValue={defaultValue}
      options={options}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      dropdownRender={dropdownRender}
      showArrow={showArrow}
    >
      {groups}
      {children}
    </StyledSelect>
  );
};

export default Select;
