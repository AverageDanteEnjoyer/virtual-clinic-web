import { SessionProvider } from './store';
import './App.css';
import Application from './Application';

function App() {
  return (
    <SessionProvider>
      <Application />
    </SessionProvider>
  );
}

export default App;
