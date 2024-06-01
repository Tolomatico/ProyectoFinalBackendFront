import { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import clienteAxios from "../../utils/axiosClient";

export function Profile() {
    const [auth, setAuth] = useContext(userContext);
    const [error, setError] = useState("")
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        cart: "",
        rol: ""
    })

    const consultaApi = async () => {
        try {
            const response = await clienteAxios.get('/api/users/profile',)

            if (!response.data.error) {
                setError(response.data.error)
            }
            setProfile({
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                email: response.data.email,
                cart: response.data.cart,
                rol: response.data.rol
            })

        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        consultaApi();
    }, []);


    return (
        <div>
            <div className="mt-8 mx-8 max-w-md">
                <div className="shadow border-grey p-5 ">
                    <h3 className="font-extrabold text-4xl">Perfil</h3>


                    <p className="font-bold text-xl my-2">Nombre: {profile.first_name} <span className="font-normal"></span></p>
                    <p className="font-bold text-xl my-2">Apellido: {profile.last_name} <span className="font-normal"></span></p>
                    <p className="font-bold text-xl my-2">mail: {profile.email}<span className="font-normal"></span></p>
                    <p className="font-bold text-xl my-2">Rol: {profile.rol}<span className="font-normal"></span></p>
                  

                    
                </div>
            </div>

        </div>
    );
}
