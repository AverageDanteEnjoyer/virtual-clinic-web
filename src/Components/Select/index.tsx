import React from 'react';
import { SelectProps } from 'antd';

import { StyledSelect } from './styles';

interface StyledSelectProps extends SelectProps {
  customOptions?: {
    label: string;
    children: { label: string; value: string; disabled?: boolean; className?: string }[];
  }[];
}

const Select = ({ customOptions, defaultValue, mode, options }: StyledSelectProps) => {
  const { Option, OptGroup } = StyledSelect;
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
    <StyledSelect mode={mode} defaultValue={defaultValue} options={options}>
      {groups}
    </StyledSelect>
  );
};

export default Select;
