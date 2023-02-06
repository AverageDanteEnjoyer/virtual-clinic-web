import styled from 'styled-components';

export const TimeOption = styled.div<{ highlighted: boolean }>`
  cursor: pointer;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;

  background-color: ${({ highlighted }) => (highlighted ? '#f0f0f0' : 'darkgrey')};
  border: ${({ highlighted }) => (highlighted ? '1px solid red' : 'none')};
`;
