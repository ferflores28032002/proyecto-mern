import { useState } from "react"
import Swal from "sweetalert2"
import sistemaApi from "../Api/sistemaApi"

export const useProductos = () => {

    const [productos, setProductos] = useState([])
    const [productoid, setproductoid] = useState({})
    const [loading, setloading] = useState(false)

    const loadProductos = async () => {
        try {

            const { data } = await sistemaApi.get("/product")
            setProductos(data.data)

            
        } catch (error) {
            console.log(error)
        }
    }

    const addProductos = async ({ name, description, stock, price, idCategories, idUserCreateProduct, image }) => {

        try {

            const reader = new FileReader();
            reader.readAsDataURL(image[0])
            reader.onloadend = async () => {
                setloading(true)
                const data = await sistemaApi.post("/product",{ name, description, stock, price, idCategories: parseInt(idCategories), idUserCreateProduct:parseInt(idUserCreateProduct), image:reader.result } )
                setloading(false)
                if(data.status === 200) {
                    Swal.fire("¡producto agregado correctamente!", "Agregado", "success")
                }
                loadProductos()
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProductos = async (id) => {

        try {
            
            const data = await sistemaApi.delete(`/product/${id}`)

            if(data.status === 200) {
                Swal.fire("¡Producto Eliminado!", "¡Eliminado exitosamente!", "success")
            }
            loadProductos()

        } catch (error) {
            console.log(error)
        }
    }

    
    const oneProducto = async (id) => {

        try {
            
            const { data } = await sistemaApi.get(`/product/${id}`)

            setproductoid(data.data)

        } catch (error) {
            console.log(error)
        }
    }


    
    const editProducts  = async ({id, name, description, stock, price, idCategories, image }) => {

        try {

            if(image.length){

                const reader = new FileReader();
                reader.readAsDataURL(image[0])
            
                    reader.onloadend = async () => {
    
                        try{
                            setloading(true)
                            const data = await sistemaApi.put(`/product/${id}`,{ name, description, stock, price, idCategories: parseInt(idCategories),image:reader.result } )
                            setloading(false)
                            if(data.status === 200) {
                                Swal.fire("Producto actualizado correctamente", "Actualizado", "success")
                            }
                            loadProductos()
                        }catch(error){
                            setloading(false)
    
                            Swal.fire(error.response.data.msg, `El Producto ${name} ya existe`, "warning")
                        }
                    }
           
            }else{

                try{
                    setloading(true)
                    const data = await sistemaApi.put(`/product/${id}`,{ name, description, stock, price, idCategories: parseInt(idCategories),  } )
                    setloading(false)
                    if(data.status === 200) {
                        Swal.fire("Usuario actualizado correctamente", "Modificado", "success")
                    }
                    loadProductos()
                }catch(error){
                    setloading(false)

                    Swal.fire(error.response.data.msg, `El producto ${name} ya existe`, "warning")
                }

            }

            
          } catch (error) {
            console.log(error)
        }
    }





    return {
        // Atributos
        productos,
        productoid,
        loading,

        // Métodos
        loadProductos,
        addProductos,
        deleteProductos,
        oneProducto,
        editProducts

    }
}
