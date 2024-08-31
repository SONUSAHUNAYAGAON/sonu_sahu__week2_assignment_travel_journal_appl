import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import AddEntry from "./components/AddEntry";
import AllEntry from "./components/AllEntry";
import EditEntry from "./components/EditEntry";

function App() {
  return (
    <BrowserRouter>
      <Home />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AllEntry />} />
        <Route path="/add-entry" element={<AddEntry />} />
        <Route path="/edit/:id" element={<EditEntry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
