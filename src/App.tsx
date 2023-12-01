import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Service from './components/Service';
import { ServiceData } from './serviceType';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [dontContainPasswords, setDontContainPasswords] = useState(true);
  const [showPasswords, setShowPasswords] = useState(true);

  const addService: any = (service: ServiceData) => {
    setServices([...services, service]);
    setIsFormVisible(false);
    setDontContainPasswords(false);
  };

  const deleteService = (service: ServiceData) => {
    const actualServices = services.filter((serviceFound) => service
      .name !== serviceFound.name);
    setServices(actualServices);
    setDontContainPasswords(true);
  };

  const handleShowPasswordsChange = () => {
    setShowPasswords((prevShowPasswords) => !prevShowPasswords);
  };

  return (
    <div className="main-container">
      <h1>Gerenciador de senhas</h1>
      {isFormVisible && <Form
        updateServices={ addService }
        cancelFunction={ () => setIsFormVisible(false) }
      />}
      {!isFormVisible && (
        <button onClick={ () => setIsFormVisible(true) }>
          Cadastrar nova senha
        </button>
      )}
      <div>
        { dontContainPasswords && <h3>Nenhuma senha cadastrada</h3> }
      </div>
      <div className="container-services">
        {services.map((service) => (<Service
          key={ service.name }
          name={ service.name }
          url={ service.url }
          login={ service.login }
          password={ showPasswords ? service.password : '******' }
          action={ () => deleteService(service) }
        />))}
      </div>
      {!dontContainPasswords && (
        <div>
          <label>
            Esconder senhas
            <input
              className="input-checkbox"
              type="checkbox"
              checked={ !showPasswords }
              onChange={ handleShowPasswordsChange }
            />
          </label>
        </div>
      )}

    </div>
  );
}

export default App;
