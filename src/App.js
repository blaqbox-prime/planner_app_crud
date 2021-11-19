import "./App.css";
import "./sass/main.scss";
import Sidebar from "./components/Sidebar";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import {Switch, Route,Redirect} from 'react-router-dom';
import SignIn from './pages/SignIn';
import Messages from './pages/Messages';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="App__main">
        <Switch>
            <Route exact path="/"><Redirect to="/appointments"/></Route> 
            <Route path="/signin"><SignIn/></Route>
            <Route path="/signup"></Route>
            <Route path="/dashboard"><Dashboard/></Route>
            <Route path="/tasks"><Tasks /></Route>
            <Route path="/messages"><Messages /></Route>
            <Route path="/appointments"><Appointments /></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
