import React from 'react';
import { SelectProps } from 'antd';

import { StyledSelect } from './styles';

interface StyledSelectProps extends SelectProps {
  customOptions?: {
    label: string;
    children: { label: string; value: string; disabled?: boolean; className?: string }[];
  }[];
}

const Select = ({customOptions, defaultValue, mode, options, placeholder }: StyledSelectProps) => {
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
    >
      {groups}
    </StyledSelect>
  );
};

export default Select;
