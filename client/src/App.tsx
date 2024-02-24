import { Route, Routes } from "react-router-dom";

// pages
import { Home } from "./pages/root";
import { Login, Register } from "./pages/auth";
import { NotFound } from "./pages";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
