import styled, { css } from 'styled-components';
import { Input as InputAntd } from 'antd';

const styles = css`
  border-radius: 20px;
  font-family: CircularStd, sans-serif;
`;

export const FilterDropdown = styled.div`
  padding: 8px;
`;

export const Input = styled(InputAntd)`
  ${styles};
  width: 200px;
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
`;
