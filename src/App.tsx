import { SessionProvider } from './store';
import './App.css';
import Application from './Application';
import { TitleProvider } from './Contexts/TitleContext';

function App() {
  return (
    <SessionProvider>
      <TitleProvider>
        <Application />
      </TitleProvider>
    </SessionProvider>
  );
}

export default App;
