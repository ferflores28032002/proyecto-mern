import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import logo2 from "../assets/imagenes/logoLogin.svg";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";
import {HiUser} from 'react-icons/hi'
import {RiLockPasswordFill} from 'react-icons/ri'
import { Link } from "react-router-dom";

const Login = () => {
  const { startLogin, errorMessage } = UseSliceAuth();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const LoginData = (data) => {
    startLogin(data);
    reset()
  };
  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("¡Error en la autenticación!", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="w-full min-h-screen bg-[#695cfe] flex justify-center items-center">
      <div className="max-w-md mx-2 py-8 p-10 shadow-2xl rounded bg-white">
        <img src={logo2} alt="logo de la empresa" />

        <form className="mt-8" onSubmit={handleSubmit(LoginData)}>
            <div className="relative mt-2 rounded shadow-sm">
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Nombre"
                {...register("name",{
                  required:true
                })}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <HiUser className="h-4 w-4 mx-3 text-blue-500 " />
              </div>
            </div>

            <div className="relative mb-3 mt-2 rounded shadow-sm">
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="contraseña"
                {...register("password",{
                  required:true
                })}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <RiLockPasswordFill className="h-4 w-4 mx-3 text-blue-500 " />
              </div>
            </div> 


            <Link className="text-sm" to="/email/password">
              ¿Olvido la contraseña?
            </Link>  

          <div className="mt-4 block mb-1">
            <button className=" w-full py-2 hover:bg-indigo-800 rounded bg-[#695cfe] text-white">
              Entrar
            </button>
          </div>


          {(errors.name?.type || errors.password?.type) === "required" && (
            <p className="text-sm w-full  text-center text-zinc-600">
              ¡Asegurate de rellenar los campos!
            </p>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
