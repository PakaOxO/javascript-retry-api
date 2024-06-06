import { useEffect } from 'react';
import styled from 'styled-components';
import ApiResult from './ApiResult';
import ApiRefresher from './ApiRefresher';
import ApiResultSkeleton from '../Skeletons/ApiResultSkeleton';
import useFetch from '../../core/useFetch';

const StyledContainer = styled.div`
  width: 240px;
`;

const ApiTester = () => {
  const { loading, data, fetch } = useFetch();

  useEffect(() => {
    fetch('');
  }, [fetch]);

  const refreshHandler = () => {
    fetch('');
  };

  return (
    <StyledContainer>
      {loading ? <ApiResultSkeleton /> : <ApiResult data={data} />}
      <ApiRefresher onRefresh={refreshHandler} />
    </StyledContainer>
  );
};

export default ApiTester;

