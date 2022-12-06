import { SessionInfoContextProvider } from './SessionInfoContext';
import './App.css';
import Application from './Application';

function App() {
  return (
    <SessionInfoContextProvider>
      <Application />
    </SessionInfoContextProvider>
  );
}

export default App;
