import { useState } from "react"
import Swal from "sweetalert2"
import sistemaApi from "../Api/sistemaApi"


export const useProveedores = () => {

    const [proveedores, setproveedores] = useState([])

    const loadproveedores = async () => {

        try {
            const { data } = await sistemaApi.get("/proveedores")
            setproveedores(data.data)
            console.log(data.data)

        } catch (error) {
            console.log(error)
        }

    }

    const addProveedores = async ({ name }) => {

        try {
            
            const data = await sistemaApi.post("/proveedores", { name })

            if(data.status === 200){
                Swal.fire("Agregado", "proveedor agregada", "success")
            }
            loadproveedores()

        } catch (error) {
            console.log(error)
        }
    }

    const deleteProveedores = async (id) => {
        try {
            
            const data = await sistemaApi.delete(`/proveedores/${id}`)

            if(data.status === 200) {
                Swal.fire("Eliminado", "elimiinado coreectamente", "success")
            }
            loadproveedores()

        } catch (error) {
            console.log(error)
        }
    }



    return {
        // Atributos 
        proveedores,

        // Métodos
        loadproveedores,
        addProveedores,
        deleteProveedores


    }
}