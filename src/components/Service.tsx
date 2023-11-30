type ServiceData = {
  name: string,
  url: string,
  login: string,
  password: string
};

function Service({ name, url, login, password }: ServiceData) {
  return (
    <div>
      <a href={ url }>{ name }</a>
      <p>{ login }</p>
      <p>{ password }</p>
    </div>
  );
}

export default Service;
