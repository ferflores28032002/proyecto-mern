import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import sistemaApi from "../Api/sistemaApi"


export const useUsuarios = () => {

    const [usuarios, setusuarios] = useState([])
    const [usuarioid, setusuarioid] = useState({})
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

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
                        setloading(true)
                        const data = await sistemaApi.post("/users",{ name, email, password, idRol:parseInt(idRol), idEmpleado: parseInt(idEmpleado), imagen: reader.result} )
                        setloading(false)
                        if(data.status === 200) {
                            Swal.fire("¡Usuario agregado correctamente!", `${name} agregado con exito`, "success")
                        }
                        loadusuarios()
                    }catch(error){
                        setloading(false)
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
                Swal.fire("¡Usuario eliminado correctamente!", "Eliminado con exito", "success")
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

    const editUsuarios  = async ({ id,name, email, idRol, idEmpleado, image}) => {

        try {

            if(image.length){

                const reader = new FileReader();
                reader.readAsDataURL(image[0])
            
                    reader.onloadend = async () => {
    
                        try{
                            setloading(true)
                            const data = await sistemaApi.put(`/users/${id}`,{ name, email, idRol:parseInt(idRol), idEmpleado: parseInt(idEmpleado), image: reader.result} )
                            setloading(false)
                            if(data.status === 200) {
                                Swal.fire("¡Usuario Actualizado correctamente!", "Modificado", "success")
                            }
                            loadusuarios()
                        }catch(error){
                            setloading(false)
    
                            Swal.fire(error.response.data.msg, `El Usuario ${name} ya existe`, "warning")
                        }
                    }
           
            }else{

                try{
                    setloading(true)
                    const data = await sistemaApi.put(`/users/${id}`,{ name, email, idRol:parseInt(idRol), idEmpleado: parseInt(idEmpleado)} )
                    setloading(false)
                    if(data.status === 200) {
                        Swal.fire("¡Usuario Actualizado correctamente!", "Modificado", "success")
                    }
                    loadusuarios()
                }catch(error){
                    setloading(false)
                    Swal.fire(error.response.data.msg, `El Usuario ${name} ya existe`, "warning")
                }

            }

            
          } catch (error) {
            console.log(error)
        }
    }


    // Enviar correos para modificar la contraseña

    const EnviarGmalNodemailer = async ({ email }) => {
        try {


            const data = await sistemaApi.post("/email/password", {email})

            if(data.status === 200) {
                Swal.fire("Se le envio un correo para que modifique su contraseña", `Revise su correo`, "success")
                navigate("/login")
            }

        } catch (error) {
            Swal.fire(error.response.data.msg, `No hay usuarios con ese email`, "warning")
        }
    }


    const updatePassword = async ({ id, password}) => {

        try {

            const { data } = await sistemaApi.put(`/restablecer/password/${id}`, {password})
            
            Swal.fire("¡Contraseña Modificada exitosamente!", data.msg, "success")
            navigate("/login")
            
        } catch (error) {
            Swal.fire(error.response.data.msg, error.response.data.msg2, "error")
        }
    }



    return {
        // Atributos 
        usuarios,
        usuarioid,
        loading,

        // Métodos
        loadusuarios,
        addUsuarios,
        deleteUsuarios,
        oneUsuario,
        editUsuarios,
        EnviarGmalNodemailer,
        updatePassword
    }
}