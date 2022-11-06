import { useDispatch, useSelector } from "react-redux"
import { sistemaApi } from "../../Api/sistemaApi";
import { onchecking, onLogin } from "../slices/authSlice";


export const UseSliceAuth = () => {

    const { user, status, errorMessage } = useSelector(state=>state.auth);
    const dispatch = useDispatch();


    // Métodos
    const startLogin = async ({ name, password }) => {
        dispatch( onchecking() )
        try {

            const { data } = await sistemaApi.post("/login/user", { name, password })
            localStorage.setItem("token", data.token)
            localStorage.setItem("token-init-date", new Date().getTime)
            dispatch( onLogin(data) )


            
        } catch (error) {
            console.log(error)
        }
    }


    return {
        // Atributos
        user,
        status,
        errorMessage,

        // Métodos
        startLogin

    }
}