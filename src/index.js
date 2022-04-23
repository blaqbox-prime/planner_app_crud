import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TaskProvider from "./contexts/TaskContext";
import AppointmentProvider from "./contexts/AppointmentContext";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./contexts/authContext";

ReactDOM.render(
  <AuthProvider>
  
<AppointmentProvider>
  <TaskProvider>
    <Router>
      <App />
    </Router>
  </TaskProvider>,
</AppointmentProvider>
</AuthProvider>,
  document.getElementById("root")
);
