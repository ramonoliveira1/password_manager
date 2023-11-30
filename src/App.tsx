import { useState } from 'react';
import './App.css';
import Form from './components/Form';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  return (
    <div className="main-container">
      <h1>Gerenciador de senhas</h1>
      {isFormVisible && <Form cancelFunction={ () => setIsFormVisible(false) } />}
      {!isFormVisible && (
        <button onClick={ () => setIsFormVisible(true) }>
          Cadastrar nova senha
        </button>
      )}

    </div>
  );
}

export default App;
