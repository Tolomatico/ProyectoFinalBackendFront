import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header"
import { Products } from "./components/Products";
import { Login } from "./components/user/Login";
import { userContext, UserProvider } from "./components/context/userContext";
import { useEffect, useState } from "react";
import { Profile } from "./components/user/Profile";
import clienteAxios from "./utils/axiosClient";



function App() {

  const [auth, setAuth] = useState(userContext)

 

  return (
    <Router>
      <UserProvider value={[auth, setAuth]}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes >
      </UserProvider>
    </Router>
  )
}

export default App