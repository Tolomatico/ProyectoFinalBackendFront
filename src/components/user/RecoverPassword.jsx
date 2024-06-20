import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import fetchData from "../../utils/fetchData"
import Swal from "sweetalert2"


export function RecoverPassword() {

    const navigate = useNavigate()
    const [data, setData] = useState({
        token: "",
        password: "",
        repited: ""
    })
    const [errors, setErrors] = useState([])
    const [token, setToken] = useState(false)

    const handleForm = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        }
        )
    }

    const sendForm = async (e) => {
        e.preventDefault()
        const newErrors = []
        if (data.password !== data.repited) newErrors.push("Los passwords deben coincidir")
        if (data.password.length < 6 || data.repited.length < 6) newErrors.push("El password debe tener al menos 6 caracteres")
        if (newErrors.length) return setErrors(newErrors)

        try {

            const response = await fetchData.post("/api/users/recoverpassword", data, {
                withCredentials: true
            })
         
            if (response.data.error) {
                newErrors.push(response.data.error)
                setErrors(newErrors)

            } else {
                Swal.fire({
                    icon: "success",
                    title: response.data.message
                })
                navigate("/login")
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops..Hubo un error"
            })
        }

    }

    const getToken = async () => {
        try {
            const response = await fetchData.get('/api/users/recoverpassword', {
                withCredentials: true
            })
            if (response.data.error) {
                return setToken(false)
            }
            setToken(true)

        } catch (error) {
            console.error('Error obteniendo el token:', error)
        }
    }

    useEffect(() => {

        getToken()
    }, [])


    return (
        <div className="mt-8 mx-auto max-w-md">
            <div className="bg-white py-8 px-4 shadow">
                {token ? (

                    <>
                        <form className="space-y-5" onSubmit={sendForm}>
                            <legend className="text-center text-2xl font-extrabold">Reestablecer password</legend>
                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Ingresar Código</label>
                            <input
                                onChange={handleForm}
                                className="w-full px-3 py-2 border-gray-300 border rounded-md placeholder-gray-400"
                                type="text"
                                placeholder="Ingresar código"
                                name="token"
                                required
                            />
                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Ingresar Password</label>
                            <input
                                onChange={handleForm}
                                className="w-full px-3 py-2 border-gray-300 border rounded-md placeholder-gray-400"
                                type="password"
                                placeholder="Password"
                                name="password"
                                required
                            />
                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Repetir Password</label>
                            <input
                                onChange={handleForm}
                                className="w-full px-3 py-2 border-gray-300 border rounded-md placeholder-gray-400"
                                type="password"
                                placeholder="Repetir password"
                                name="repited"
                                required
                            />
                            <input
                                className="w-full bg-blue-600 rounded-lg hover:bg-blue-700 text-white font-bold py-3 cursor-pointer"
                                type="submit"
                                value="Ingresar"
                            />
                        </form>

                        {errors.length > 0 && errors.map((error, index) => (
                            <p key={index} className="border uppercase bg-red-500 rounded-md text-center text-white p-1 font-bold mt-2">
                                {error}
                            </p>
                        ))}
                        <div className="flex justify-between my-5">
                            <Link className="text-gray-500 font-bold text-xs" to="/register">No estas registrado? Registrate aquí</Link>
                            <Link className="text-gray-500 font-bold text-xs" to="/passrecover">Olvidé mi contraseña</Link>
                        </div>
                    </>
                ) : (
                <div className="bg-red-500 p-10 rounded-xl ">
                    <p className="text-center text-2xl font-extrabold m-3 ">El token ah caducado</p>
                    <p className="text-center text-xl font-extrabold m-3 text-white">Vuelve a intentarlo nuevamente</p>
                </div>
            )}

            </div>
        </div>
    )
}

