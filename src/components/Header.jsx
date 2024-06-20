import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./context/userContext";
import fetchData from "../utils/fetchData.js";
import Swal from "sweetalert2";


export function Header() {
    const navigate = useNavigate()

    const [auth, setAuth] = useContext(userContext)

    const logout = async () => {
        const response = await fetchData.get("/api/users/logout",
            { withCredentials: true }
        )

        setAuth({
            auth: false,
            token: ""
        })
        Swal.fire({
            icon: 'success',
            title: 'Sesión Finalizada',
            text: "Que vuelvas prontos",
            showConfirmButton: false,
            timer: 1500
        })
        navigate("/login")
    }


    return (

        <header >
            <nav className="mx-auto bg-white justify-between items-center sm:flex p-5">
            <ul className="sm:flex gap-10">
    {auth?.user?.rol === "admin" && (
        <>
            <li className="text-xl font-bold">
                <Link className="text-xl font-bold text-blue-800" to="/admin">Panel de admin</Link>
            </li>
            <li>
                <Link className="text-xl font-bold text-blue-800" to="/realtimeproducts">Productos en Tiempo Real</Link>
            </li>
        </>
    )}

    {auth?.user?.rol === "premium" && (
        <>
            <li className="text-xl font-bold">
                <Link className="text-xl font-bold text-blue-800" to="/products">Productos</Link>
            </li>
            <li>
                <Link className="text-xl font-bold text-blue-800" to="/realtimeproducts">Productos en Tiempo Real</Link>
            </li>
        </>
    )}

    {auth?.user?.rol === "user" && (
        <li className="text-xl font-bold">
            <Link className="text-xl font-bold text-blue-800" to="/products">Productos</Link>
        </li>
    )}
</ul>




                <ul className="sm:flex gap-10">
                    {auth.auth ? (
                        <>
                            <li>
                                <Link className="text-xl font-bold text-blue-800" to="/profile">Perfil</Link>
                            </li>
                            <li>
                                <input type="button" className="text-xl font-bold text-blue-800 cursor-pointer" onClick={logout} value="Cerrar Sesión" />
                            </li>

                            {auth?.user?.rol === "admin" ? null :
                                <li>
                                    <Link to={`/cart/${auth.user.cart}`} className="text-xl font-bold text-blue-800 cursor-pointer">Carrito</Link>
                                </li>


                            }



                        </>
                    ) : (
                        <>
                            <li>
                                <Link className="text-xl font-bold text-blue-800" to="/login">Iniciar Sesión</Link>
                            </li>
                            <li>
                                <Link className="text-xl font-bold text-blue-800" to="/register">Registrarse</Link>
                            </li>
                        </>
                    )}
                </ul>


            </nav>
        </header>
    )
}




