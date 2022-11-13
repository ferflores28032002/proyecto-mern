import { useState } from "react"
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



    return {
        // Atributos 
        proveedores,

        // Métodos
        loadproveedores


    }
}