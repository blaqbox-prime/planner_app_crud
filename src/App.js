import "./App.css";
import "./sass/main.scss";
import Sidebar from "./components/Sidebar";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import {Switch, Route,Redirect} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="App__main">
        <Switch>
            <Route exact path="/"><Redirect to="/dashboard"/></Route> 
            <Route path="/dashboard"><Dashboard/></Route>
            <Route path="/tasks"><Tasks /></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
