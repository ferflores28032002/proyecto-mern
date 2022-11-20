import {  useState } from "react"
import Swal from "sweetalert2"
import sistemaApi from "../Api/sistemaApi"


export const useCargos = () => {

    const [cargos, setcargos] = useState([])


    const loadCargos = async () => {

        try {
            const { data } = await sistemaApi.get("/cargos")
            setcargos(data.data)

        } catch (error) {
            console.log(error)
        }

    }

    const addCargos = async ({ name, description }) => {

        try {
            
            const data = await sistemaApi.post("/cargos", { name, description } )

            if(data.status === 200) {
                Swal.fire("¡Cargo Añadido correctamente!", `${name} creado con exito`, "success")
            }

            loadCargos()

        } catch (error) {
            Swal.fire(error.response.data.msg, `El cargo ${name} ya existe`, "warning")
        }

    }

    const deleteCargos = async (id) => {

        try {
            
            const data = await sistemaApi.delete(`/cargos/${id}`)

            if(data.status === 200){
                Swal.fire("¡Cargo eliminado correctamente!", `${name} eliminado`, "success")
            }

            loadCargos()

        } catch (error) {
            console.log(error)
        }
    }



    const editCargos = async ({ id, name, description}) => {

        try {
            
            const data = await sistemaApi.put(`/cargos/${id}`, { name , description})

            if(data.status === 200) {
                Swal.fire("¡Cargo actualizado!", "modificado con exito", "success")
            }
            loadCargos()

        } catch (error) {
            Swal.fire(error.response.data.msg, `El cargo ${name} ya existe`, "warning")
        }

    }





    return {
        // Atributos 
        cargos,


        // Métodos
        loadCargos,
        addCargos,
        deleteCargos,
        editCargos


    }
}