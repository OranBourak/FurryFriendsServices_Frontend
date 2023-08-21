import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarCustom from './components/NavbarCustom.jsx';

function App() {
  let component;

  switch (window.location.pathname) {
    case '/':
      component = <h1>Home</h1>;
      break;
    case '/login':
      component = <h1>Login</h1>;
      break;
    default:
      component = <h1>404</h1>;
      break;
  }
  return (
    <>
      <NavbarCustom />
      {component}
    </>
  );
};
export default App;
