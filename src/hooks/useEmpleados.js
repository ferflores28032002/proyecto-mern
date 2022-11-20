import { useState } from "react"
import Swal from "sweetalert2"
import sistemaApi from "../Api/sistemaApi"


export const useEmpleados = () => {

    const [empleados, setempleados] = useState([])
    const [empleadoid, setempleadoid] = useState({})

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
                Swal.fire("¡Agregado Correctamente!", `${name} ha sido Agregado con exito`, "success")
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

    
    const oneEmpleado = async (id) => {

        try {
            
            const { data } = await sistemaApi.get(`/empleado/${id}`)

            setempleadoid(data.data)

        } catch (error) {
            console.log(error)
        }
    }




    const editEmpleados = async ({id, name, surnames, age, telephone, salary, direction, sex, idCargo }) => {

        try {
            
            const data = await sistemaApi.put(`/empleado/${id}`, { name, surnames, age, telephone, salary, direction, sex, idCargo: parseInt(idCargo) })

            if(data.status === 200){
                Swal.fire("Actualizado Correctamente", `Empleado ${name} actualizado`, "success")
            }
            loadempleados()

        } catch (error) {
            console.log(error)
        }

    }





    return {
        // Atributos 
        empleados,
        empleadoid,

        // Métodos
        loadempleados,
        addEmpleados,
        deleteEmpleados,
        oneEmpleado,
        editEmpleados


    }
}