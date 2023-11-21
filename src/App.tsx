import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp"
import SignIn from "./components/SignIn/SignIn";
import Products from "./components/Products/Products";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/signIn" element={<SignIn />}></Route>
          <Route path="/products" element={<Products />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
