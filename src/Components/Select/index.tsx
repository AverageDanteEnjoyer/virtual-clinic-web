import { SelectProps } from 'antd';

import { StyledSelect } from './styles';

interface StyledSelectProps extends SelectProps {
  customOptions?: {
    label: string;
    children: { label: string; value: string; disabled?: boolean; className?: string }[];
  }[];
  onChange?: any;
  filterOption?: any;
}

const Select = ({
  customOptions,
  defaultValue,
  mode,
  options,
  placeholder,
  className,
  onSearch,
  onChange,
  filterOption,
  dropdownRender,
  showArrow,
  children,
  value,
  searchValue,
  notFoundContent,
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
      onSearch={onSearch}
      filterOption={filterOption}
      dropdownRender={dropdownRender}
      showArrow={showArrow}
      value={value}
      searchValue={searchValue}
      notFoundContent={notFoundContent}
    >
      {groups}
      {children}
    </StyledSelect>
  );
};

export default Select;
