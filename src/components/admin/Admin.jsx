import { useContext, useEffect, useState } from "react"
import { userContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import fetchData from "../../utils/fetchData"

export function Admin() {

    const navigate = useNavigate()
    const [auth, setAuth] = useContext(userContext)
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const response = await fetchData.get("/api/users")
        setUsers(response.data)


    }

    const deleteUser = async (id) => {
        await fetchData.delete(`/api/users/${id}`)
        getUsers()
    }

    const deleteOldUsers = async () => {
        const actualDate = new Date()
        const expiredDate = new Date(actualDate.getTime() - 5 * 60 * 1000) // Borra a los 5 minutos

        const usersLastConnections = users.filter(user => new Date(user.last_connection) < expiredDate)
        console.log(usersLastConnections)
         for (let i = 0; i < usersLastConnections.length; i++) {

             await deleteUser(usersLastConnections._id)

         }

    }



    useEffect(() => {
        if (!auth) return navigate("/login")
        if (auth?.user?.rol !== "admin") return navigate("/login")
        getUsers()

    }, [auth, navigate])



    return (
        <>
            <h1 className="text-center mt-5 text-3xl font-bold text-blue-700 mb-10">Panel de admin</h1>

            <div className="mx-10 shadow bg-white rounded-md p-10">
                <div className="flex justify-between">
                    <h2 className="mt-5 text-3xl font-bold text-blue-700 mb-10 ">Usuarios</h2>
                    <button onClick={deleteOldUsers} className="mt-5 text-xl font-bold text-white mb-10 bg-red-500 rounded-lg px-2 hover:bg-red-700">Eliminar usuarios inactivos</button>
                </div>


                <table className="table-auto p-2">
                    <tr className="text-center border ">
                        <th className="border px-2">Nombre</th>
                        <th className="border px-2">Apellido</th>
                        <th className="border px-2">Email</th>
                        <th className="border px-2">Edad</th>
                        <th className="border px-2">Rol</th>
                        <th className="border px-2">Token</th>
                        <th className="border px-2">Carrito</th>
                        <th className="border px-2">Última conexión</th>
                        <th className="border px-2">Eliminar Usuario</th>


                    </tr>


                    {
                        users?.map(user => (
                            <tr className="text-center border" key={user._id}>

                                <td className="border px-2">{user.first_name}</td>
                                <td className="border px-2">{user.last_name}</td>
                                <td className="border px-2">{user.email}</td>
                                <td className="border px-2">{user.age}</td>
                                <td className="border px-2">{user.rol}</td>
                                {user.token ?

                                    <td className="border px-2">{user.token}</td> : <td className="border px-2">null</td>
                                }

                                <td className="border px-2">{user.cart}</td>
                                <td className="border px-2">{user.last_connection}</td>
                                <td>  <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white rounded-md px-2 my-1 hover:bg-red-700">Borrar</button></td>



                            </tr>
                        ))}
                </table>
            </div>
        </>
    )
}