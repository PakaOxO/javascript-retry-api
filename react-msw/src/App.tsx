import './App.css';
import styled from 'styled-components';
import ApiTester from './components/ApiTester/ApiTester';

const StyledFlexbox = styled.div`
  position: relative;
  width: 1040px;
  padding: 40px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px 20px;
`;

function App() {
  return (
    <div className="App">
      <StyledFlexbox>
        <ApiTester title="성공" target="/api/success" type="success" />
        <ApiTester title="실패" target="/api/fail" type="fail" />
        <ApiTester title="고정 지연" target="/api" type="constant-delay" retry={5} />
        <ApiTester title="피보나치 백오프" target="/api" type="fibonacchi-backoff" retry={5} />
        <ApiTester title="무작위 재시도" target="/api" type="random-retry" retry={5} />
        <ApiTester title="즉시 재시도" target="/api" type="instant-retry" retry={5} />
      </StyledFlexbox>
    </div>
  );
}

export default App;

