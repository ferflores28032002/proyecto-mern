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

    const addRoles = async ({ name, description }) => {
        try {
            
            const data = await sistemaApi.post("/roles", { name, description })


            if(data.status === 200){
                Swal.fire("¡Rol Creado exitosamente!", `${name} creado con exito`, "success")
            }
            loadroles()

        } catch (error) {
            Swal.fire(error.response.data.msg, `El rol ${name} ya existe`, "warning")
        }
    }

    const deleteRoles = async (id) => {

        try {
            
            const data = await sistemaApi.delete(`/roles/${id}`)

            if(data.status === 200){
                Swal.fire("¡Rol eliminado correctamente!", "Eliminado", "success")
            }
            loadroles()

        } catch (error) {
            console.log(error)
        }
    }

    const editRoles = async ({ id, name, description }) => {
        try {
            
            const data = await sistemaApi.put(`/roles/${id}`, { name, description })

            if(data.status === 200){
                Swal.fire("¡Editado exitosamente!", "rol editado con exito", "success")
            }
            loadroles()

        } catch (error) {
            Swal.fire(error.response.data.msg, `El rol ${name} ya existe`, "warning")
        }
    }



    return {
        // Atributos 
        roles,

        // Métodos
        loadroles,
        addRoles,
        deleteRoles,
        editRoles


    }
}