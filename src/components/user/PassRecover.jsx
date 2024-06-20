import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import fetchData from "../../utils/fetchData"
import Swal from "sweetalert2"

export function PassRecover(){

    const navigate=useNavigate()
    const [email,setEmail]=useState({
        email:""
    })
    const [error,setError]=useState("")
    const handleForm=(e)=>{
        setEmail({[e.target.name]:e.target.value})

    }

    const sendForm=async(e)=>{
        e.preventDefault()
        try {
            const response=await fetchData.post("/api/users/recover",email,{
                withCredentials:true
            })
           
            if(response.data.error){
              return setError(response.data.error)
            }
            
            Swal.fire(
                {
                    icon:"success",
                    title:response.data.message,
                    text: response.data.payload
                }
            )


            
        } catch (error) {
            Swal.fire({
                icon:"error",
                title:"Oops.. Hubo un error"
                }
            )
        }


    }   


    return(
        <div className="mt-8 mx-auto max-w-md">
        <div className="bg-white py-8 px-4 shadow">
            <form className="space-y-5" onSubmit={sendForm} >
                <legend className="text-center text-2xl font-extrabold"> Reestablecer password</legend>
                <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Ingrese su email</label>
                <input
                    onChange={handleForm}
                    className="w-full px-3 py-2  border-gray-300 border rounded-md placeholder-gray-400" type="mail"
                    placeholder="email"
                    name="email"
                    required />
    
                <input
                    className="w-full bg-blue-600 rounded-lg hover:bg-blue-700 text-white font-bold py-3 cursor-pointer"
                    type="submit"
                    value="Ingresar"
                />

                {
                    error ? (<p className="border uppercase bg-red-500 rounded-md text-center text-white p-1 font-bold">{error}</p>) :
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