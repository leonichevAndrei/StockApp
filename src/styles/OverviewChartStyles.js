import styled from 'styled-components';

const calculateLeft = (center, offset) => `calc(${center} - ${offset}px)`;

export const SelectTimeFrame = styled.select`
  position: relative;
  left: ${calculateLeft('50%', 133)};
  font-size: 16px;
  height: 28px;
  width: 266px;
  margin: 15px 0 10px;
`;

export const OptTimeFrame = styled.option`
`;