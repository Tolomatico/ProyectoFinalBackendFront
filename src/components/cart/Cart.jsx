import { useNavigate, useParams, redirect } from "react-router-dom";
import { Item } from "./item";
import { useContext, useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import { userContext } from "../context/userContext";
import Swal from "sweetalert2";

export function Cart() {
    const navigate = useNavigate()

    const { id } = useParams()
    const [cart, setCart] = useState([])
    const [auth, setAuth] = useContext(userContext)

    const getCart = async () => {
        try {
            const response = await fetchData.get(`/api/carts/${id}`)
            setCart(response.data)
        } catch (error) {
            console.log(error)
        }


    }

    const emptyCart = async (id) => {
        const response = await fetchData.delete(`api/carts/${id}`)

        try {
            if (!response.data.error) {
                Swal.fire({
                    icon: "error",
                    title: "No se pudo vaciar el carrito",
                    text: "Intenta nuevamente"
                })
            }
            if (response.data.status === 201) {

                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    text: "Agrega nuevos productos"
                })
                setCart([])
            }
            if (response.data.status === 200) {

                Swal.fire({
                    icon: "success",
                    title: response.data.message,
                    text: "Agrega nuevos productos"
                })
                setCart([])
            }


        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "No se pudo vaciar el carrito",
                text: "Intenta nuevamente"
            })
        }


    }

    const totalAmount = cart => cart?.products?.reduce((acc, item) => {
        return acc + (item?.product?.price * item?.quantity)
    }, 0)
    const total = totalAmount(cart)


    const generateTicket = async (id) => {
        try {

            const response = await fetchData.post(`/api/carts/${id}/purchase`)

            
            if (response.status === 201) {
               
                Swal.fire({
                    icon: "success",
                    title: "Ticket Generado con éxito",
                    text: `El código es ${response.data.payload.code}`
                })
                return  getCart()
            }
            if(response.status===404){
                return Swal.fire({
                    icon: "error",
                    title: "No hemos podido generar la compra",
                    text: "Intenta nuevamente mas tarde"
                })

            }



        } catch (error) {
            return Swal.fire({
                icon: "error",
                title: "Oops hubo un error...",
            })
           
        }
    }

    useEffect(() => {

        if (!auth?.user) {
            navigate("/login")
        } else {
            getCart()

        }


    }, [auth, navigate])







    return (
        <>

            <h1 className="font-extrabold text-4xl my-5 text-center">Mi carrito</h1>

            <section className="mt-8 mx-10">

                <div className="bg-white py-8 px-4 shadow ">

                    <div className="flex justify-center flex-wrap gap-10">


                        {cart?.products?.length ? cart.products.map(item => (
                            <Item key={item._id} item={item} getCart={getCart} />

                        )) : ("El carrito se encuentra vacio")
                        }


                    </div>

                    {cart?.products?.length ? (
                        <div className="flex-column justify-center space-y-5 text-center">

                            <p className="text-xl mt-5 font-bold ">Total a Pagar: ${total}</p>

                            <button className=" font-bold p-2 rounded-xl bg-red-500 text-xl hover:bg-red-600 text-white m-1" onClick={() => emptyCart(id)}>Vaciar el carrito</button>
                            <button className=" font-bold p-2 rounded-xl bg-green-500 text-xl hover:bg-green-600 text-white m-1" onClick={() => generateTicket(cart._id)}>Generar Compra</button>
                        </div>) : (null)

                    }


                </div>

            </section>



        </>
    );
}
