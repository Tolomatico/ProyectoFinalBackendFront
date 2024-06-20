import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData";
import Swal from "sweetalert2";
import { userContext } from "../context/userContext";

export function Register() {
    const navigate = useNavigate()
    const [auth,setAuth]=useContext(userContext)
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        age: ""
    })

    const [errors, setErrors] = useState([])

    const handleForm = e => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const newErrors = [];

        if (!form.first_name) newErrors.push("El nombre es obligatorio")
        if (!form.last_name) newErrors.push("El apellido es obligatorio")
        if (!form.email) newErrors.push("El email es obligatorio")
        if (!form.password) newErrors.push("La contraseña es obligatoria")
        if (!form.age) newErrors.push("La edad es obligatoria")
        if (!form.password.length > 6) newErrors.push("El password debe tener al menos 6 caracteres")

        if (newErrors.length > 0) {
           return setErrors(newErrors)
        }
        try {

            const response = await fetchData.post("/api/users/register", form)
          

            if (response.data.error) {
                newErrors.push(response.data.error)
                setErrors(newErrors)

            }else {
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    text: "Ya puedes inciar sesión",
                    showConfirmButton: false,
                    timer: 2000
                })
    
                setErrors([])
                navigate("/login")
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
        <>
            <div className="mt-8 mx-auto max-w-md">

                <div className="bg-white py-8 px-4 shadow">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <legend className="text-center text-2xl font-extrabold">Formulario de registro</legend>
                        <label className="block text-sm uppercase text-gray-500 mb-2 font-bold" >Ingresar Nombre</label>
                        <input className="w-full px-3 py-2  border-gray-300 border rounded-md placeholder-gray-400"
                            placeholder="nombre"
                            name="first_name"
                            onChange={handleForm}
                        />
                        <label className="block text-sm uppercase text-gray-500 mb-2 font-bold" >Ingresar Apellido</label>
                        <input className="w-full px-3 py-2  border-gray-300 border rounded-md placeholder-gray-400"
                            type="text"
                            placeholder="apellido"
                            name="last_name"
                            onChange={handleForm}
                        />
                        <label className="block text-sm uppercase text-gray-500 mb-2 font-bold" >Ingresar Email</label>
                        <input className="w-full px-3 py-2  border-gray-300 border rounded-md placeholder-gray-400"
                            type="mail"
                            placeholder="email"
                            name="email"
                            onChange={handleForm}
                        />
                        <label className="block text-sm uppercase text-gray-500 mb-2 font-bold" >Password</label>
                        <input className="w-full px-3 py-2  border-gray-300 border rounded-md placeholder-gray-400"
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={handleForm}
                        />
                        <label className="block text-sm uppercase text-gray-500 mb-2 font-bold" >Ingresar Edad</label>
                        <input className="w-full px-3 py-2  border-gray-300 border rounded-md placeholder-gray-400"
                            type="number"
                            placeholder="age"
                            name="age"
                            onChange={handleForm}
                        />
                        <input className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 cursor-pointer"
                            type="submit"
                            value="Registrarse"

                        />


                        {
                            errors.length ? (errors.map((error, index) => (
                                <p key={index} className="border uppercase bg-red-500 rounded-md text-center text-white p-1 font-bold">{error}</p>
                            ))) :
                                (null)
                        }

                    </form>
                    <div className="flex justify-between my-5">
                        <Link className="text-gray-500 font-bold text-xs" to="/login">Ya estas registrado? Inicia sesión aquí</Link>
                        <Link className="text-gray-500 font-bold text-xs" to="/passrecover">Olvidé mi contraseña</Link>
                    </div>
                </div>


            </div>

        </>
    )
}