import { useState } from "react"
import Swal from "sweetalert2"
import sistemaApi from "../Api/sistemaApi"


export const useCategorias = () => {

    const [categorias, setcategorias] = useState([])

    const loadcategorias = async () => {

        try {
            const { data } = await sistemaApi.get("/categories")
            setcategorias(data.data)
            console.log(data.data)

        } catch (error) {
            console.log(error)
        }

    }

    const addCategorias = async ({ name }) => {

        try {
            
            const data = await sistemaApi.post("/categories", { name })
            console.log(data.status)

            if(data.status === 200){
                Swal.fire("Agregado Correctamente", `Categoria ${name} agregada`, "success")
            }

            loadcategorias()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCategorias = async (id) => {
    
        try {
            
            const data = await sistemaApi.delete(`/categories/${id}`)

            if(data.status === 200) {
                Swal.fire("Categoria eliminada Correctamente", "Eliminado", "success")
            }

            loadcategorias()
            

        } catch (error) {
            console.log(error)
        }
    }



    return {
        // Atributos 
        categorias,

        // Métodos
        loadcategorias,
        addCategorias,
        deleteCategorias


    }
}