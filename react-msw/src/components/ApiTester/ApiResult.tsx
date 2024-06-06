import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  height: 280px;
  border: 1px solid black;
`;

interface IProps {
  data: any;
}

const ApiResult: React.FC<IProps> = ({ data }) => {
  console.log(data);

  return <StyledContainer></StyledContainer>;
};

export default ApiResult;

