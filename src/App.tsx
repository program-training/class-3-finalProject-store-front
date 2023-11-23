import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import LayersHeader from "./components/Header/Layers";
import SignIn from "./components/SignIn/SignIn";
import ProductPage from "./components/productPage/ProductPage";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayersHeader />}>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/product/:productId" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
