import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp"

function App() {
  return (
    <>
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
