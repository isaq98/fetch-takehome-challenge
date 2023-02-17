import CreationForm from 'Components/CreationForm';
import { Toaster } from 'react-hot-toast';
import './_App.scss';

function App() {
  return (
    <div className="App">
      <Toaster position='top-center' reverseOrder={false} />
      <div className="creation-form-container">
        <CreationForm />
      </div>
    </div>
  );
}

export default App;
