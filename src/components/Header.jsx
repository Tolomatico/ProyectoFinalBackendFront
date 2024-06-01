import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./context/userContext";

import clienteAxios from "../utils/axiosClient";
import Swal from "sweetalert2";

export function Header() {
    const navigate=useNavigate()

    const [auth, setAuth] = useContext(userContext)

    const logout=async()=>{
        const response=await clienteAxios.get("/api/users/logout")
        console.log(response.data)
        setAuth({
            auth:false,
            token:""
        })
        Swal.fire({
            icon: 'success',
            title: 'Sesión Finalizada',
            text:"Que vuelvas prontos",
            showConfirmButton: false,
            timer: 1500
          })
        navigate("/login")
    }


    return (

        <header >
            <nav className="mx-auto bg-blue-600 justify-between items-center sm:flex p-10">
                <ul className="sm:flex gap-10 ">
                    <li className="text-3xl font-bold ">
                        <Link className="text-3xl font-bold text-white" to="/products">Productos</Link>
                    </li>
                    <li>
                        <Link className="text-3xl font-bold text-white" to="/realtimeproducts">Productos en Tiempo Real</Link>
                    </li>
                    <li>
                        <Link className="text-3xl font-bold text-white" to="/chat">Chat</Link>
                    </li>
                </ul>

                <ul className="sm:flex gap-10">
                    {auth.auth ? (
                        <>
                            <li>
                                <Link className="text-3xl font-bold text-white" to="/profile">Perfil</Link>
                            </li>
                            <li>
                                <input type="button" className="text-3xl font-bold text-white cursor-pointer" onClick={logout} value="Cerrar Sesión" />
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className="text-3xl font-bold text-white" to="/login">Iniciar Sesión</Link>
                            </li>
                            <li>
                                <Link className="text-3xl font-bold text-white" to="/register">Registrarse</Link>
                            </li>
                        </>
                    )}
                </ul>


            </nav>
        </header>
    )
}




