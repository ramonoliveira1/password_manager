type ServiceData = {
  name: string,
  url: string,
  login: string,
  password: string,
  action: () => void
};

function Service({ name, url, login, password, action }: ServiceData) {
  return (
    <div className="service-card">
      <a href={ url }>{ name }</a>
      <p>{ login }</p>
      <p>{ password }</p>
      <button data-testid="remove-btn" onClick={ action }>🗑️</button>
    </div>
  );
}

export default Service;
