import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  height: 280px;
  border: 1px solid black;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface IProps {
  data: any;
}

const ApiResult: React.FC<IProps> = ({ data }) => {
  if (!data || !data.imgSrc) {
    return (
      <StyledContainer>
        <StyledImg alt="fetch image" src="https://i.pinimg.com/564x/5c/63/69/5c6369751090deec8fdc4b34b6fe5c45.jpg" />
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledImg alt="fetch image" src={data.imgSrc} />
    </StyledContainer>
  );
};

export default ApiResult;

