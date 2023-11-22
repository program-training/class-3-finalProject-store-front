import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Products from "./components/Products/Products";
import ProductPage from "./components/productPage/ProductPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/product" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
