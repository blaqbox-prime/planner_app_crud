import "./App.css";
import "./sass/main.scss";
import {Switch, Route,Redirect} from 'react-router-dom';
import SignIn from './pages/SignIn';

import SignUp from './pages/SignUp';
import MainApp from "./components/MainApp";
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/signin"><SignIn/></Route>
          <Route path="/signup"><SignUp/></Route>
          <Route exact path="/"><Redirect to="/app"/></Route>
          <PrivateRoute path="/app" component={MainApp}/>
      </Switch> 
    </div>
  );
}


export default App;
