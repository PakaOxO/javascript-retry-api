import React from 'react';

import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  height: 280px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ApiResultSkeleton = () => {
  return <StyledContainer>Loading...</StyledContainer>;
};

export default ApiResultSkeleton;

