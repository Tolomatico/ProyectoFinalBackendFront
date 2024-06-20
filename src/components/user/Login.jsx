import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { userContext } from "../context/userContext"
import fetchData from "../../utils/fetchData"

export function Login() {
    const [auth, setAuth] = useContext(userContext)
    const navigate = useNavigate()
    const [user, setUser] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
   
    const handleForm = (e) => {
        e.preventDefault()

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const sendForm = async (e) => {
        e.preventDefault()
        if (!user.email || !user.password) return setError("LLena todos los campos para continuar")
            
            try {
            const response = await fetchData.post(`/api/users/login`, user,{
                token:`token`,
                withCredentials:true
            })
     
            if (response.data.error) {
                setError("")
                setError(response.data.error)
            } else {
                Swal.fire(
                    'Bienvenido',
                    'Has iniciado sesión correctamente',
                    'success'
                )
                
                setAuth({auth:true,
                    user:response.data.user})
               navigate("/profile")
               
            }   

        } catch (error) {

            Swal.fire(
                'Error',
                'Ha ocurrido un error',
                'error'
            )
        }
    }

    

    return (
        <div className="mt-8 mx-auto max-w-md">
            <div className="bg-white py-8 px-4 shadow">
                <form className="space-y-5" onSubmit={sendForm} >
                    <legend className="text-center text-2xl font-extrabold"> Iniciar sesión</legend>
                    <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Ingrese su email</label>
                    <input
                        onChange={handleForm}
                        className="w-full px-3 py-2  border-gray-300 border rounded-md placeholder-gray-400" type="mail"
                        placeholder="email"
                        name="email"
                        required />
                    <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Ingresar Password</label>

                    <input
                        onChange={handleForm}
                        className="w-full px-3 py-2  border-gray-300 border rounded-md placeholder-gray-400"
                        type="password"
                        placeholder="password"
                        name="password"
                        required />
                    <input
                        className="w-full bg-blue-600 rounded-lg hover:bg-blue-700 text-white font-bold py-3 cursor-pointer"
                        type="submit"
                        value="Ingresar"
                    />

                    {
                        error.length ? (<p className="border uppercase bg-red-500 rounded-md text-center text-white p-1 font-bold">{error}</p>) :
                            (null)
                    }
                </form>

                <div className="flex justify-between my-5">
            <Link className="text-gray-500 font-bold text-xs" to="/register">No estas registrado? Registrate aquí</Link>
            <Link className="text-gray-500 font-bold text-xs" to="/passrecover">Olvidé mi contraseña</Link>
        </div>

            </div>
        </div>
    )
}