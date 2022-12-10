import { Pagination, Select, Divider } from 'antd';
import CustomSelect from '../../Components/Select';
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
    <CustomSelect
      mode="multiple"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <Pagination current={page} pageSize={pageSize} total={30} onChange={(pageIndex) => setPage(pageIndex)} />
          </div>
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
    </CustomSelect>
  );
};

export default ProfessionSelector;
