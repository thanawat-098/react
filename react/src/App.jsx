import Adduser from "./Add/Adduser";
import "./App.css";
import {
  BrowserRouter, Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Adduser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
