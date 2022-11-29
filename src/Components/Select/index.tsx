import React from 'react';
import { Select, SelectProps } from 'antd';

interface StyledSelectProps extends SelectProps {
  customOptions?: {
    label: string;
    children: { label: string; value: string; disabled?: boolean; className?: string }[];
  }[];
}

const StyledSelect = ({
  style,
  customOptions,
  defaultValue,
  mode,
  options,
  onChange,
  placeholder,
}: StyledSelectProps) => {
  const { Option, OptGroup } = Select;
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
    <Select
      mode={mode}
      defaultValue={defaultValue}
      style={style}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
    >
      {groups}
    </Select>
  );
};

export default StyledSelect;
