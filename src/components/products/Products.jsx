import { useContext, useEffect, useState } from "react"
import fetchData from "../../utils/fetchData"
import { Product } from "./Product"
import { useNavigate } from "react-router-dom"
import { userContext } from "../context/userContext"


export function Products() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [auth, setAuth] = useContext(userContext);


    const fetchProducts = async () => {
        const response = await fetchData.get("/api/products", {
            withCredentials: true
        })
        const arrayProducts = response.data
        const filtered = arrayProducts.filter(product => product.status=== true && product.stock > 0)
        setProducts(filtered)

    }

    useEffect(() => {

        fetchProducts()

    }, [])


    if (!auth.user) return navigate("/login")
    return (
        <>
            <h1 className="font-extrabold text-4xl my-5 text-center">Productos</h1>


            <section className="mt-8 mx-10">
                <div className="bg-white py-8 px-4 shadow flex flex-wrap">

                    <div className="flex justify-space-around flex-wrap gap-10">
                        {
                            products.length ? products?.map(product => (
                                <Product key={product._id} product={product} />

                            )) : (<p className="font-bold text-center text-xl">No se encuentra ningún producto</p>)

                        }

                    </div>


                </div>
            </section>
        </>
    )
}