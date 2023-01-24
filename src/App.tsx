import { SessionInfoContextProvider } from './SessionInfoContext';
import './App.css';
import Application from './Application';
import { TitleProvider } from './Contexts/TitleContext';

function App() {
  return (
    <SessionInfoContextProvider>
      <TitleProvider>
        <Application />
      </TitleProvider>
    </SessionInfoContextProvider>
  );
}

export default App;
