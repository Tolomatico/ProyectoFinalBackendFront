import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import fetchData from "../../utils/fetchData";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export function Profile() {

    const navigate = useNavigate()
    const [auth, setAuth] = useContext(userContext);
    const [error, setError] = useState("")
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        cart: "",
        rol: "",
        id:""
    })

    const consultaApi = async () => {
        try {
            const response = await fetchData.get('/api/users/profile',
                { withCredentials: true }
            )
   
            if (!response.data.error) {
                setError(response.data.error)
            }

            setProfile({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                cart: response.data.cart,
                rol: response.data.rol,
                id:response.data.id
            })
           
        } catch (error) {
            setError(error)
        }
    }

    const bePremium=async(id)=>{
        const response= await fetchData.put(`/api/users/premium/${id}`)
       
        if(response.status ===200){
            
            setProfile()
         Swal.fire({
                title:  `Has cambiado tu rol a ${response.data.payload}`,
                text: "Logueate nuevamente para ver los cambios",
                timer: 2000
              
              })

              consultaApi()
              
           
        }else {
            Swal.fire({
                title:  "Oops hubo un error...",
                text: "Intentalo de nuevo mas tarde",
                timer: 2000
              })
        }
    
        
    }

    useEffect(() => {

        consultaApi()
       
    }, [])

    if (!auth.auth) return navigate("/login")
    return (
        <div>
            <div className="mt-8 mx-8 max-w-md">
                <div className="shadow border-grey p-5 ">
                    <h3 className="font-extrabold text-4xl">Perfil</h3>


                    <p className="font-bold text-xl my-2">Nombre: {profile?.first_name} <span className="font-normal"></span></p>
                    <p className="font-bold text-xl my-2">Apellido: {profile?.last_name} <span className="font-normal"></span></p>
                    <p className="font-bold text-xl my-2">mail: {profile?.email}<span className="font-normal"></span></p>
                    <p className="font-bold text-xl my-2">Rol: {profile?.rol}<span className="font-normal"></span></p>
                    {
                        profile?.rol === "user" ?
                            <div className="flex-column text-center">
                                <p className="my-2">Conviertete en usuario Premium y vende tus productos </p>
                                <p >Para ser Premium </p>
                                <button onClick={()=>bePremium(auth.user.id)} className="font-bold text-xl my-2 bg-blue-500 rounded-xl p-2 text-white">Haz click aquí </button>
                            </div> :
                            null

                    }


                </div>
            </div>

        </div>
    );
}
