import './App.css';
import './sass/main.scss';
import {v4 as guid} from 'uuid';
import User from './models/User.js';
import {tasks} from './models/Task.js';


function App() {

  const damien = new User(
    guid(),
    'Damien',
    'Lewis',
    'Standard Account'
)

 console.log(tasks);

  console.log(damien.getFullName())

  return (
    <div className="App">
     <h1>Sass Is Working</h1>
    </div>
  );
}

export default App;
