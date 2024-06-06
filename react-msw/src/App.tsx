import './App.css';
import styled from 'styled-components';
import ApiTester from './components/ApiTester/ApiTester';

const StyledFlexbox = styled.div`
  position: relative;
  width: 1100px;
  padding: 40px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

function App() {
  return (
    <div className="App">
      <StyledFlexbox>
        <ApiTester />
        <ApiTester />
        <ApiTester />
        <ApiTester />
      </StyledFlexbox>
    </div>
  );
}

export default App;

