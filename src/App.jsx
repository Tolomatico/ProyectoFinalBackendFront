import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header"
import { Login } from "./components/user/Login";
import { userContext, UserProvider } from "./components/context/userContext";
import { useState } from "react";
import { Profile } from "./components/user/Profile";
import { Register } from "./components/user/Register";
import { Products } from "./components/products/Products";
import { Cart } from "./components/cart/Cart"
import { PassRecover } from "./components/user/PassRecover";
import { RecoverPassword } from "./components/user/RecoverPassword";
import { RealTimeProducts } from "./components/products/RealTimeProducts";
import { Admin } from "./components/admin/Admin";
import NotFound from "./utils/NotFound";



function App() {

  const [auth, setAuth] = useState(userContext)


  return (
    <Router>
      <UserProvider value={[auth, setAuth]}>
        <Header />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/realtimeproducts" element={<RealTimeProducts />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/passrecover" element={<PassRecover />} />
          <Route path="/change" element={<RecoverPassword />} />
          <Route path="/*" element={<NotFound />} />

        </Routes >
      </UserProvider>
    </Router>
  )
}

export default App