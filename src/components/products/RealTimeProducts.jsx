
import { useContext, useEffect, useState } from "react"
import fetchData from "../../utils/fetchData"
import { useNavigate } from "react-router-dom"
import { userContext } from "../context/userContext"
import { ProductRealTime } from "./ProductRealTime"


export function RealTimeProducts() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState([])
    const [auth, setAuth] = useContext(userContext);
    const [data, setData] = useState({
        title: "",
        description: "",
        price: "",
        img: "",
        stock: "",
        status: "",
        code: "",
        category: "",
        owner: auth?.user?.email
    })
    const [file, setFile] = useState("")


    const handleFile = (e) => {
        e.preventDefault()

        setFile(e.target.files[0])
    }

    const handleData = (e) => {


        e.preventDefault()
        setData({
            ...data,
            [e.target.name]: e.target.value
        })


    }

    const fetchProducts = async () => {
        const response = await fetchData.get("/api/products", {
            withCredentials: true
        })
        setProducts(response.data)


    }

    const uploadProduct = async (e) => {
        e.preventDefault()

        setErrors([])
        const newErrors = []
        if (!data.title) newErrors.push("Falta el nombre")
        if (!data.price) newErrors.push("Falta el precio")
        if (!data.description) newErrors.push("Falta la descriptción")
        if (!data.category) newErrors.push("Falta la categoria")
        if (!data.img) newErrors.push("Falta el nombre de la imagen")
        if (!data.stock) newErrors.push("Falta el stock")
        if (!data.status) newErrors.push("Falta el estado")
        if (!file) newErrors.push("Falta la imagen")
        if (!data.code) newErrors.push("Falta el código")
        const repitedCode = products.find(product => product.code === data.code)
        if (repitedCode) newErrors.push("Código en uso")

        if (newErrors.length > 0) {
            return setErrors(newErrors)
        }

        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("stock", data.stock)
        formData.append("code", data.code)
        formData.append("img", data.img)
        formData.append("description", data.description)
        formData.append("status", data.status)
        formData.append("thumbnail", file)
        formData.append("owner", data.owner)
        try {

            const response = await fetchData.post("/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            

            fetchProducts()

        } catch (error) {
            console.log(error)
        }




    }

    useEffect(() => {

        fetchProducts()

    }, [])




    if (!auth.user) return navigate("/login")
    return (
        <>
            <h1 className="font-extrabold text-4xl my-5 text-center">Productos en tiempo real</h1>


            <section className="mt-8 mx-10 bg-white shadow ">
                <div className=" flex gap-5 flex-wrap">

                    <div className="w-fit m-5  shadow flex flex-wrap">
                        {
                            products.length ? products.map(product => (
                                <ProductRealTime fetchProducts={fetchProducts} key={product._id} product={product} />

                            )) : <p className="text-bold text-xl text-center" >No se encuentra ningúin producto</p>

                        }

                    </div>

                    <div className="w-fit shadow p-10 m-5 ">
                        <form
                            onSubmit={uploadProduct}
                            className="space-y-2"
                        >
                            <legend className="font-bold text-gray-700 text-center text-xl mb-5">Agregar Producto al Catálogo</legend>

                            {
                                errors.length ? errors.map((error, index) => (

                                    <p className="bg-red-500 text-white uppercase font-bold p-1 text-center  rounded-md" key={index}>{error}</p>
                                )) : null

                            }

                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Nombre del producto</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                name="title"
                                onChange={handleData}
                            />

                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Descripción</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                name="description"
                                onChange={handleData}
                            />

                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Precio</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="number"
                                name="price"
                                onChange={handleData}
                            />
                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Imagen</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                name="img"
                                onChange={handleData}
                            />
                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Imagen</label>
                            <input className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="file"
                                name="thumbnail"
                                onChange={handleFile}
                            />

                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Stock</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="number"
                                name="stock"
                                onChange={handleData}
                            />

                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Codigo</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                name="code"
                                onChange={handleData}
                            />

                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Categoría</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                type="text"
                                name="category"
                                onChange={handleData}
                            />

                            <label className="block text-sm uppercase text-gray-500 mb-2 font-bold">Añade su Estado</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400"
                                id="status"
                                name="status"
                                onChange={handleData}
                            >
                                <option value="true">Activo</option>
                                <option value="false">Inactivo</option>
                            </select>


                            <input
                                className="w-full bg-blue-600 mt-3 rounded-lg hover:bg-blue-700 text-white font-bold py-3 cursor-pointer"
                                type="submit"
                                value="Agregar Producto"

                            />
                        </form>

                    </div>

                </div>
            </section>
        </>
    )
}

