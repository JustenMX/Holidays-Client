import debug from "debug";
import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CreateHolidayForm from "./pages/CreateHolidayForm";
import HolidaysTable from "./pages/HolidaysTable";
import Login from "./pages/Login";

const log = debug("holidays:client:App");
localStorage.debug = "holidays:*";

function App() {
  log("Loading App");
  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HolidaysTable />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/secret" element={<CreateHolidayForm token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
