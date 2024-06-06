import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f7f;
  }

  &:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }
`;

interface IProps {
  text: string;
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<IProps> = ({ text, clickHandler }) => {
  return <StyledButton onClick={clickHandler}>{text}</StyledButton>;
};

export default Button;

