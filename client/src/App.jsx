import { SnackbarProvider } from 'notistack';
import Router from './Router';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router />
    </SnackbarProvider>
  );
}

export default App;