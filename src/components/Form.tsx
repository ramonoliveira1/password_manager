import { useState } from 'react';
import './Form.css';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

type FormProps = {
  cancelFunction: () => void;
  updateServices: (service: any) => void;
};

function Form({ cancelFunction, updateServices }: FormProps) {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [isButtonAvailable, setIsButtonAvailable] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const isPasswordShort = password.length >= 8;
  const isPasswordLong = password.length <= 16;
  const passwordContainsNumbersAndLetters = /[a-zA-Z]/.test(password) && /\d/.test(password);
  const passwordContainsSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const validPasswordClass = 'valid-password-check';
  const invalidPasswordClass = 'invalid-password-check';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newService = { name, login, password, url };
    updateServices(newService);
  };

  const validateForm = () => {
    const isNameValid = !!name.trim();
    const isLoginValid = !!login.trim();
    const isPasswordValid = isPasswordShort
      && isPasswordLong
      && passwordContainsNumbersAndLetters
      && passwordContainsSpecialChars;

    setIsButtonAvailable(isNameValid && isLoginValid && isPasswordValid);
  };

  return (
    <form onSubmit={ (e) => e.preventDefault() }>
      <label htmlFor="name">Nome do serviço</label>
      <input
        type="text"
        name="name"
        id="name"
        value={ name }
        onChange={ (e) => { setName(e.target.value); validateForm(); } }
      />

      <label htmlFor="login">Login</label>
      <input
        type="text"
        name="login"
        id="login"
        value={ login }
        onChange={ (e) => { setLogin(e.target.value); validateForm(); } }
      />
      <div className="container-password">
        <div className="input-password">
          <label htmlFor="password">Senha</label>
          <input
            type={ showPass ? 'text' : 'password' }
            name="password"
            id="password"
            value={ password }
            onChange={ (e) => { setPassword(e.target.value); validateForm(); } }
          />
        </div>
        <button
          data-testid="show-hide-form-password"
          onClick={ () => setShowPass(!showPass) }
        >
          { showPass ? (<EyeSlashFill size={ 24 } />) : (<EyeFill size={ 24 } />)}
        </button>
      </div>

      <ul>
        <li
          className={ !isPasswordShort
            ? invalidPasswordClass : validPasswordClass }
        >
          Possuir 8 ou mais caracteres
        </li>
        <li
          className={ !isPasswordLong
            ? invalidPasswordClass : validPasswordClass }
        >
          Possuir até 16 caracteres
        </li>
        <li
          className={ !passwordContainsNumbersAndLetters
            ? invalidPasswordClass : validPasswordClass }
        >
          Possuir letras e números
        </li>
        <li
          className={ !passwordContainsSpecialChars
            ? invalidPasswordClass : validPasswordClass }
        >
          Possuir algum caractere especial
        </li>
      </ul>

      <label htmlFor="url">URL</label>
      <input
        type="text"
        name="url"
        id="url"
        value={ url }
        onChange={ (e) => setUrl(e.target.value) }
      />

      <button
        onClick={ handleSubmit }
        disabled={ !isButtonAvailable }
      >
        Cadastrar
      </button>
      <button onClick={ cancelFunction }>Cancelar</button>
    </form>
  );
}

export default Form;
