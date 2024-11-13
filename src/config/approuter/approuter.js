import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/home";
import Login from "../../pages/login";
import Signup from "../../pages/signup";

export function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/*" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
