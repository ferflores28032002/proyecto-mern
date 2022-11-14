import { useState } from "react"
import Swal from "sweetalert2"
import sistemaApi from "../Api/sistemaApi"


export const useUsuarios = () => {

    const [usuarios, setusuarios] = useState([])
    const [usuarioid, setusuarioid] = useState({})

    const loadusuarios = async () => {

        try {
            const { data } = await sistemaApi.get("/users")
            setusuarios(data.data)

        } catch (error) {
            console.log(error)
        }

    }

    const addUsuarios = async ({ name, email, password, idRol, idEmpleado, image}) => {
        
        try {

            const reader = new FileReader();
            reader.readAsDataURL(image[0])
            
        
                reader.onloadend = async () => {

                    try{
                        const data = await sistemaApi.post("/users",{ name, email, password, idRol:parseInt(idRol), idEmpleado: parseInt(idEmpleado), imagen: reader.result} )
                        if(data.status === 200) {
                            Swal.fire("Usuario agregado correctamente", "agregado", "success")
                        }
                        loadusuarios()
                    }catch(error){

                        Swal.fire(error.response.data.msg, `El Usuario ${name} ya existe`, "warning")
                    }
                }
       
            
          } catch (error) {
            console.log(error)
        }
    }

    const deleteUsuarios = async (id) => {

        try {
            
            const data = await sistemaApi.delete(`/users/${id}`)

            if(data.status === 200) {
                Swal.fire("Usuario eliminado correctamente", "eleiminado", "success")
            }
            loadusuarios()

        } catch (error) {
            console.log(error)
        }

    }

    
    const oneUsuario = async (id) => {

        try {
            
            const { data } = await sistemaApi.get(`/user/${id}`)

            setusuarioid(data.data)

        } catch (error) {
            console.log(error)
        }
    }

    const editUsuarios  = async ({ id,name, email, password, idRol, idEmpleado, image}) => {

        try {

            if(image.length){

                const reader = new FileReader();
                reader.readAsDataURL(image[0])
            
                    reader.onloadend = async () => {
    
                        try{
                            const data = await sistemaApi.put(`/users/${id}`,{ name, email, password, idRol:parseInt(idRol), idEmpleado: parseInt(idEmpleado), image: reader.result} )
                            if(data.status === 200) {
                                Swal.fire("Usuario agregado correctamente", "agregado", "success")
                            }
                            loadusuarios()
                        }catch(error){
    
                            Swal.fire(error.response.data.msg, `El Usuario ${name} ya existe`, "warning")
                        }
                    }
           
            }else{

                try{
                    const data = await sistemaApi.put(`/users/${id}`,{ name, email, password, idRol:parseInt(idRol), idEmpleado: parseInt(idEmpleado)} )
                    if(data.status === 200) {
                        Swal.fire("Usuario agregado correctamente", "agregado", "success")
                    }
                    loadusuarios()
                }catch(error){

                    Swal.fire(error.response.data.msg, `El Usuario ${name} ya existe`, "warning")
                }

            }

            
          } catch (error) {
            console.log(error)
        }
    }



    return {
        // Atributos 
        usuarios,
        usuarioid,

        // Métodos
        loadusuarios,
        addUsuarios,
        deleteUsuarios,
        oneUsuario,
        editUsuarios

    }
}