import styled from 'styled-components';
import { Input as InputAntd } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import palette from '../../palette';

export const FilterDropdown = styled.div`
  padding: 8px;
`;

export const Input = styled(InputAntd)`
  border-radius: 20px;
  font-family: CircularStd, sans-serif;
  width: 200px;
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const SearchIcon = styled(SearchOutlined)`
  color: ${palette.sonicSilver};
`;
