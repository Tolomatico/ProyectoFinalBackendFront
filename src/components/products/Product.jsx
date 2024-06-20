import { useContext } from "react"
import { userContext } from "../context/userContext"
import fetchData from "../../utils/fetchData"
import Swal from "sweetalert2"


export function Product({ product }) {

    const [auth, setAuth] = useContext(userContext)

    const { title, price, stock, thumbnail, _id, owner } = product

    const addProduct = async (id, owner) => {



        if (auth.user.email === owner) {
            return Swal.fire({
                icon: "error",
                title: "No puedes comprarlo",
                text: "El producto es tuyo"

            })
        }

        try {
            const response = await fetchData.post(`/api/carts/${auth.user.cart}/product/${id}`,{}, {
                withCredentials: true
            })
            console.log(response.status);
            console.log(response.data);

       

            if ( response.data.status === "error" && response.data.error === "El producto ya está en el carrito") {
                Swal.fire(
                    "El producto ya se encuentra en el carrito",
                    "Ve al carrito",
                    "error"
                );
            } else if (response.data.status === "success") {
                Swal.fire(
                    "Se ha agregado al carrito",
                    "Vé a tu carrito para ver los productos",
                    "success"
                );
            } else {
                throw new Error(response.data.error || "Error desconocido");
            }
        } catch (error) {
            Swal.fire(
                "Oops..Hubo un error",
                "No se pudo agregar al carrito",
                "error"
            );
            console.error("Error al agregar el producto:", error);
        }


    }

    return (
        <article className=" w-80 flex-column gap-10 justify-center text-center rounded-xl shadow p-5 ">
            <img className="w-32 h-32 mx-auto" src={`http://localhost:8080/img/${thumbnail}`} />
            <p className="font-bold text-xl">{title}</p>
            <p className="font-bold text-xl">Precio: ${price}</p>
            <p className="font-bold text-xl">stock: {stock}u.</p>
            <button onClick={() => addProduct(_id, owner)} className=" rounded-xl p-2 bg-green-500 text-white hover:bg-green-700" >Agregar al carrito</button>
        </article>
    )
}