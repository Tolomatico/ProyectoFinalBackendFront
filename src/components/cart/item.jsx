import { useContext} from "react"
import fetchData from "../../utils/fetchData"
import { userContext } from "../context/userContext"
import Swal from "sweetalert2"

export function Item({ item, getCart }) {


    const [auth, setAuth] = useContext(userContext)
    const { title, price, _id } = item?.product || {}
    const total = price * item.quantity

    const deleteProduct = async (id) => {

        Swal.fire({
            title: "Seguro desea eliminarlo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo!",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {

            if (result.isConfirmed) {
                const response = await fetchData.delete(`/api/carts/${auth.user.cart}/product/${id}`)

                if (response.status === 200) {
                    Swal.fire({
                        title: "Eliminado!",
                        icon: "success"
                    });
                    getCart()

                } else
                    Swal.fire({
                        title: "Oops hubo un error",
                        icon: "error"
                    })

            }
        })

    }

    const addQuantity = async (id) => {


        try {
            const response = await fetchData.put(`/api/carts/${auth.user.cart}/product/${id}`, {
                quantity: 1
            })


            if (response.status === 200) {
                getCart()
            } else {

                Swal.fire({
                    title: "Oops hubo un error",
                    icon: "error"
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Oops hubo un error",
                icon: "error"
            })
        }
    }

    const lessQuantity = async (id) => {

        try {

            const response = await fetchData.put(`/api/carts/${auth.user.cart}/product/${id}`, {
                quantity: -1
            })
            if (response.status === 200) {
                getCart()
            } else {

                Swal.fire({
                    title: "Oops hubo un error",
                    icon: "error"
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Oops hubo un error",
                icon: "error"
            })
        }
    }



    return (
        <article className="space-y-3 w-50 flex-column gap-10 justify-center text-center  border-rounder-xl shadow p-2 ">
            <img className="w-32 h-32 mx-auto" src={`${import.meta.env.VITE_API_URL}/img/${item.product.thumbnail[0]}`} />
            <p className="font-bold text-xl">{title}</p>
            <p className="font-bold text-xl">${price}</p>

            <div className="flex justify-center">
                <button onClick={() => lessQuantity(_id)} className="font-bold text-xl mx-2">-</button>
                <p className="font-bold text-xl rounded-xl p-1 shadow">Cantidad: {item.quantity}</p>
                <button onClick={() => addQuantity(_id)} className="font-bold text-xl mx-2">+</button>
            </div>
            <button
                className=" rounded-full px-3 bg-red-500 text-white hover:bg-red-600"
                onClick={() => deleteProduct(_id)}
            > X </button>
            <p className="font-bold text-xl">total: ${total}</p>

        </article>
    )
}