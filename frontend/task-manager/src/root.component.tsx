import './modal-styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskManagerPage from "./components/task-manager-component";

export default function Root() {

  return (
      <Router>
          <Routes>
              <Route path="/task-manager" element={<TaskManagerPage />}></Route>
          </Routes>
      </Router>
  );
}
