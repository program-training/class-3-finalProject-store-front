import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp"
import ResponsiveAppBar from "./components/Header/Header";

function App() {
  return (
    <>
    <ResponsiveAppBar/>
      <BrowserRouter>
        <Routes>
          
          <Route path="/signUp" element={<SignUp />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App