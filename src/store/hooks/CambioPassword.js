import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import { sistemaApi } from "../../Api"

export const  CambioPassword = () => {

    const { user } = useSelector(state => state.auth)


    const updatePassword = async (password, password2) => {

        try {

            const { data } = await sistemaApi.put(`/update/password/user/${user.data.id}`, {password, password2})
            Swal.fire("Modificada", data.msg, "success")
            
        } catch (error) {
            Swal.fire(error.response.data.msg, error.response.data.msg2, "error")
        }
    }



    return {
        updatePassword
    }
}