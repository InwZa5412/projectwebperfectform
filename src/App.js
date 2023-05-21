import logo from './logo.svg';
import './App.css';
import {MainRoutes} from './page/MainRoutes';
import Nav from "./component/Nav";
function App() {
  return (<>
    <Nav/>
    <MainRoutes/>
    </>
  );
}

export default App;
