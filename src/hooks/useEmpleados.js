import { useState } from "react"
import Swal from "sweetalert2"
import sistemaApi from "../Api/sistemaApi"


export const useEmpleados = () => {

    const [empleados, setempleados] = useState([])

    const loadempleados = async () => {

        try {
            const { data } = await sistemaApi.get("/empleados")
            setempleados(data.data)
            console.log(data.data)

        } catch (error) {
            console.log(error)
        }

    }

    const addEmpleados = async ({ name, surnames, age, telephone, salary, direction, sex, idCargo }) => {

        try {
            
            const data = await sistemaApi.post("/empleados", { name, surnames, age, telephone, salary, direction, sex, idCargo: parseInt(idCargo) })

            if(data.status === 200){
                Swal.fire("Agregado Correctamente", `Empleado ${name} Agregado`, "success")
            }
            loadempleados()

        } catch (error) {
            console.log(error)
        }

    }

    const deleteEmpleados = async (id) => {

        try {
            
            const data = await sistemaApi.delete(`/empleados/${id}`)

            if(data.status === 200){
                Swal.fire("Empleado eliminado correctamente", "eliminado", "success")
            }

            loadempleados()

        } catch (error) {
            console.log(error)
        }
    }



    return {
        // Atributos 
        empleados,

        // Métodos
        loadempleados,
        addEmpleados,
        deleteEmpleados


    }
}