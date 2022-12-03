import { SessionInfoContextProvider } from './SessionInfoContext';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  return (
    <header>
      <SessionInfoContextProvider>
        <Navbar />
      </SessionInfoContextProvider>
    </header>
  );
}

export default App;
