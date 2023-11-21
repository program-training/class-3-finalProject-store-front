import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp"
import SignIn from "./components/SignIn/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/signIp" element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
