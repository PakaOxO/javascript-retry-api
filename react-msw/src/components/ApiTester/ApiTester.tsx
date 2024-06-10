import { useEffect } from 'react';
import styled from 'styled-components';
import ApiResult from './ApiResult';
import ApiRefresher from './ApiRefresher';
import ApiResultSkeleton from '../Skeletons/ApiResultSkeleton';
import useFetch from '../../core/useFetch';

const StyledContainer = styled.div`
  width: 240px;
`;

const StyledTitle = styled.h3`
  text-align: center;
`;

interface IProps {
  title: string;
  target: string;
  type: string;
  retry?: number;
}

const ApiTester: React.FC<IProps> = ({ title, target, type, retry = 0 }) => {
  const { loading, data, fetch } = useFetch();

  useEffect(() => {
    fetch(target, type, retry);
  }, [fetch, type, target, retry]);

  const refreshHandler = () => {
    fetch(target, type, retry);
  };

  return (
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      {loading ? <ApiResultSkeleton /> : <ApiResult data={data} />}
      <ApiRefresher onRefresh={refreshHandler} />
    </StyledContainer>
  );
};

export default ApiTester;

