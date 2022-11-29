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
  const groups = customOptions?.map((group) => {
    const options = group.children.map((option) => (
      <Option className={option.className} key={option.value} value={option.value}>
        {option.label}
      </Option>
    ));
    return (
      <OptGroup key={group.label} label={group.label}>
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
