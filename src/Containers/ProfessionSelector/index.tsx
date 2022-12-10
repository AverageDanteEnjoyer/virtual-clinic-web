import { Pagination, Select } from 'antd';
import React, { useState } from 'react';

const ProfessionSelector = () => {
  const [page, setPage] = useState<number>(1);

  let names = ['abc', 'def', 'ghj', 'abc', 'def', 'ghj'];
  const pageSize = 2;

  const getNames = (pageNumber: number) => {
    let toSendNames = [];
    for (let i = (pageNumber - 1) * pageSize; i < pageNumber * pageSize; i++) {
      toSendNames.push(names[i]);
    }
    return toSendNames;
  };

  return (
    <Select
      style={{ width: 250 }}
      mode="multiple"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Pagination current={page} pageSize={pageSize} total={10} onChange={(pageIndex) => setPage(pageIndex)} />
        </>
      )}
      showArrow
    >
      {getNames(page).map((item, idx) => {
        return (
          <Select.Option key={(page - 1) * pageSize + idx} value={item}>
            {item}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default ProfessionSelector;
