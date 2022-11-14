// import { useDispatch } from "react-redux"
// import sistemaApi from "../../Api/sistemaApi"
// import { getProductos } from "../slices/ProductSlice"


// export const UseProduct = () => {
//     const dispatch = useDispatch()


//     const getProducts = async () => {

//         try {
            
//             const { data } = await sistemaApi.get("/product")
            
//             dispatch( getProductos(data.data) )

//         } catch (error) {
//             console.log(error)
//         }


//     }

//     return {

//         // Métodos

//         getProducts

//     }
// }