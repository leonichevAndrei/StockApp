import styled from 'styled-components';

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
`;

export const TabButton = styled.button`
  padding: 10px;
  margin: 5px;
  background-color: #282c34;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #555577;
  }
`;
