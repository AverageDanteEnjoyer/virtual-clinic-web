import React from "react";
import { Select, SelectProps } from "antd";

const { Option, OptGroup } = Select;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

interface StyledSelectProps extends SelectProps {
  indicatorStyle?: React.CSSProperties;
}

const SelectExample: React.FC<StyledSelectProps> = (
  props: StyledSelectProps
) => (
  <Select
    allowClear={props.allowClear}
    autoClearSearchValue={props.autoClearSearchValue}
    autoFocus={props.autoFocus}
    bordered={props.bordered}
    clearIcon={props.clearIcon}
    defaultActiveFirstOption={props.defaultActiveFirstOption}
    defaultOpen={props.defaultOpen}
    defaultValue={props.defaultValue}
    disabled={props.disabled}
    popupClassName={props.popupClassName}
    dropdownMatchSelectWidth={props.dropdownMatchSelectWidth}
    dropdownRender={props.dropdownRender}
    dropdownStyle={props.dropdownStyle}
    fieldNames={props.fieldNames}
    filterOption={props.filterOption}
    filterSort={props.filterSort}
    getPopupContainer={props.getPopupContainer}
    labelInValue={props.labelInValue}
    listHeight={props.listHeight}
    loading={props.loading}
    maxTagCount={props.maxTagCount}
    maxTagPlaceholder={props.maxTagPlaceholder}
    maxTagTextLength={props.maxTagTextLength}
    style={{ width: 200 }}
    onChange={handleChange}
  >
    <OptGroup label="Manager">
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
    </OptGroup>
    <OptGroup label="Engineer">
      <Option value="Yiminghe">yiminghe</Option>
    </OptGroup>
  </Select>
);

export default SelectExample;
