import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const StyledContainer = styled.div`
  padding: 4px;
  display: flex;
  justify-content: center;
`;

interface IProps {
  onRefresh: () => void;
}

const ApiRefresher: React.FC<IProps> = ({ onRefresh }) => {
  return (
    <StyledContainer>
      <Button text="데이터 요청" clickHandler={onRefresh} />
    </StyledContainer>
  );
};

export default ApiRefresher;

