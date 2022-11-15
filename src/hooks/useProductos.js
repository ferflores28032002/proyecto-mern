import { useState } from "react"
import Swal from "sweetalert2"
import sistemaApi from "../Api/sistemaApi"

export const useProductos = () => {

    const [productos, setProductos] = useState([])
    const [productoid, setproductoid] = useState({})

    const loadProductos = async () => {
        try {

            const { data } = await sistemaApi.get("/product")
            setProductos(data.data)

            
        } catch (error) {
            console.log(error)
        }
    }

    const addProductos = async ({ name, description, stock, price, idCategories, idUserCreateProduct, idProveedor, image }) => {

        try {

            const reader = new FileReader();
            reader.readAsDataURL(image[0])
            reader.onloadend = async () => {
                const data = await sistemaApi.post("/product",{ name, description, stock, price, idCategories: parseInt(idCategories), idUserCreateProduct:parseInt(idUserCreateProduct), idProveedor: parseInt(idProveedor), image:reader.result } )
    
                if(data.status === 200) {
                    Swal.fire("producto agregado correctamente", "agregado", "success")
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
                Swal.fire("eliminado", "producto eliminado", "success")
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


    
    const editProducts  = async ({id, name, description, stock, price, idCategories, idProveedor, image }) => {

        try {

            if(image.length){

                const reader = new FileReader();
                reader.readAsDataURL(image[0])
            
                    reader.onloadend = async () => {
    
                        try{
                            const data = await sistemaApi.put(`/product/${id}`,{ name, description, stock, price, idCategories: parseInt(idCategories),  idProveedor: parseInt(idProveedor), image:reader.result } )
                            if(data.status === 200) {
                                Swal.fire("Producto actualizado correctamente", "agregado", "success")
                            }
                            loadProductos()
                        }catch(error){
    
                            Swal.fire(error.response.data.msg, `El Producto ${name} ya existe`, "warning")
                        }
                    }
           
            }else{

                try{
                    const data = await sistemaApi.put(`/product/${id}`,{ name, description, stock, price, idCategories: parseInt(idCategories),  idProveedor: parseInt(idProveedor)} )
                    if(data.status === 200) {
                        Swal.fire("Usuario actualizado correctamente", "agregado", "success")
                    }
                    loadProductos()
                }catch(error){

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

        // Métodos
        loadProductos,
        addProductos,
        deleteProductos,
        oneProducto,
        editProducts

    }
}
