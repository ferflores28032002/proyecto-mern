import { useState } from "react"
import Swal from "sweetalert2"
import sistemaApi from "../Api/sistemaApi"


export const useCargos = () => {

    const [cargos, setcargos] = useState([])

    const loadCargos = async () => {

        try {
            const { data } = await sistemaApi.get("/cargos")
            setcargos(data.data)
            console.log(data.data)

        } catch (error) {
            console.log(error)
        }

    }

    const addCargos = async ({ name }) => {

        try {
            
            const data = await sistemaApi.post("/cargos", { name } )

            if(data.status === 200) {
                Swal.fire("Añadido correctamente", "añadido", "success")
            }

            loadCargos()

        } catch (error) {
            console.log(error)
        }

    }

    const deleteCargos = async (id) => {

        try {
            
            const data = await sistemaApi.delete(`/cargos/${id}`)

            if(data.status === 200){
                Swal.fire("Cargo eliminado correctamente", "eliminado", "success")
            }

            loadCargos()

        } catch (error) {
            console.log(error)
        }
    }




    return {
        // Atributos 
        cargos,

        // Métodos
        loadCargos,
        addCargos,
        deleteCargos


    }
}