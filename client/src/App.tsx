import { Route, Routes } from "react-router-dom";

// pages
import { Home } from "./pages/root";
import { Register } from "./pages/auth";
import { NotFound } from "./pages";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
