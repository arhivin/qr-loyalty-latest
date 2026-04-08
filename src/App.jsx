import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing.jsx";
import Qr1 from "./pages/qr1.jsx";
import Qr2 from "./pages/qr2.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/qr-1" element={<Qr1 />} />
        <Route path="/qr-2" element={<Qr2 />} />
      </Routes>
    </BrowserRouter>
  );
}