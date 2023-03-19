import logo from './logo.svg';
import './App.css';
import Appointments from './Appointments';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Appointments></Appointments>
    </div>
  );
}

export default App;
