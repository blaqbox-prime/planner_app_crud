import "./App.css";
import "./sass/main.scss";
import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="App__main">
        <Tasks />
      </main>
    </div>
  );
}

export default App;
