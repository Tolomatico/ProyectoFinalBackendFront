import { useContext } from "react"
import { userContext } from "../context/userContext"
import fetchData from "../../utils/fetchData"
import Swal from "sweetalert2"


export function ProductRealTime({ product, fetchProducts }) {

    const [auth, setAuth] = useContext(userContext)

    const { title, price, stock, thumbnail, _id, owner } = product


    const deleteProduct = async (id, owner) => {



        if (owner !== auth.user.email && auth.user.rol !== "admin") {
            return Swal.fire({
                icon: "error",
                title: "No puedes eliminarlo",
                text: "Este producto no es tuyo",
                timer: 2000
            })
        }

        try {
            const response = await fetchData.delete(`/api/products/${id}`)

            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Producto Eliminado",
                    timer: 2000
                })

                fetchProducts()

            }
        } catch (error) {
            return Swal.fire({
                icon: "error",
                title: "Oops hubo un error..",
                timer: 2000

            })
        }

    }


    return (
        <article className=" w-60 h-fit justify-center text-center  rounded-lg shadow p-5 m-5">
            <img className="w-32 h-32 mx-auto" src={`${import.meta.env.VITE_API_URL}/img/${thumbnail}`} />
            <p className="font-bold text-xl">{title}</p>
            <p className="font-bold text-xl">Precio: ${price}</p>
            <p className="font-bold text-xl">stock: {stock}u.</p>
            <button onClick={() => deleteProduct(_id, owner)} className="rounded-xl p-2 bg-red-500 text-white hover:bg-red-700" >Eliminar Producto</button>
        </article>
    )
}