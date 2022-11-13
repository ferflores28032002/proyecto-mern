import { useState } from "react"
import Swal from "sweetalert2"
import sistemaApi from "../Api/sistemaApi"


export const useRoles = () => {

    const [roles, setroles] = useState([])

    const loadroles = async () => {

        try {
            const { data } = await sistemaApi.get("/roles")
            setroles(data.data)
            console.log(data.data)

        } catch (error) {
            console.log(error)
        }

    }

    const addRoles = async ({ name }) => {
        try {
            
            const { data } = await sistemaApi.post("/roles", { name })

            console.log(data)

            loadroles()

        } catch (error) {
            console.log(error)
        }
    }

    const deleteRoles = async (id) => {

        try {
            
            const data = await sistemaApi.delete(`/roles/${id}`)

            if(data.status === 200){
                Swal.fire("Rol eliminado correctamente", "Eliminado", "success")
            }
            loadroles()

        } catch (error) {
            console.log(error)
        }
    }



    return {
        // Atributos 
        roles,

        // Métodos
        loadroles,
        addRoles,
        deleteRoles


    }
}