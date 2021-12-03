import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TaskProvider from "./TaskContext";
import AppointmentProvider from "./AppointmentContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <AppointmentProvider>
  <TaskProvider>
    <Router>
      <App />
    </Router>
  </TaskProvider>,
  </AppointmentProvider>,
  document.getElementById("root")
);
