import { useForm } from "react-hook-form";
import password_login from "../assets/imagenes/password.svg";
import { RiLockPasswordFill } from "react-icons/ri";
import { CgPassword } from "react-icons/cg";
import Swal from "sweetalert2";
import { useUsuarios } from "../hooks/useUsuarios";
import { useParams } from "react-router-dom";

const UserPassword = () => {

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();


  const { updatePassword } = useUsuarios()

  const { id } = useParams()

  const LoginData = (data) => {
    const { password1, password2 } = data;

    if (password1 !== password2) {
      Swal.fire("¡Las contraseñas no son iguales!","Verifique bien por favor","info");
    } else {
      updatePassword({
        password: password2,
        id
      })
    }

    reset();
  };

  return (
    <div className="w-full min-h-screen bg-[#695cfe] flex justify-center items-center">
      <div className="max-w-md mx-2 py-8 p-10 shadow-2xl rounded bg-white">
        <img src={password_login} alt="logo de la empresa" />

        <form className="mt-8" onSubmit={handleSubmit(LoginData)}>
          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Nueva contraseña"
              {...register("password1", {
                required: true,
              })}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <CgPassword className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="relative mb-3 mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Repite la contraseña"
              {...register("password2", {
                required: true,
              })}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <RiLockPasswordFill className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="mt-4 block mb-1">
            <button className=" w-full py-2 hover:bg-indigo-800 rounded bg-[#695cfe] text-white">
              Cambiar
            </button>
          </div>

          {(errors.password1?.type || errors.password2?.type) ===
            "required" && (
            <p className="text-sm w-full  text-center text-zinc-600">
              ¡Asegurate de rellenar los campos!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserPassword;
