import debug from "debug";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CreateHolidayForm from "./components/CreateHolidayForm";
import Login from "./components/Login";

const log = debug("holidays:client:App");
localStorage.debug = "holidays:*";

function App() {
  log("Loading App");
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/secret" element={<CreateHolidayForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
