import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import logo2 from "../assets/imagenes/undraw_logistics_x-4-dc (1).svg";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";

const Login = () => {
  const { startLogin } = UseSliceAuth();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const LoginData = (data) => {
    startLogin(data);
  };

  return (
    <div className="w-full min-h-screen bg-[#695cfe] flex justify-center items-center">
      <div className="max-w-md mx-2 py-8 p-10 shadow-2xl rounded bg-white">
        <img src={logo2} alt="logo de la empresa" />

        <form className="mt-4" onSubmit={handleSubmit(LoginData)}>
          <input
            type="text"
            className="w-full border-indigo-200 border-2 outline-none bg-indigo-100 mb-4 px-4 py-4 rounded"
            placeholder="Usuario"
            {...register("name", {
              required: true,
            })}
          />

          <input
            type="text"
            className="w-full border-indigo-200 border-2 outline-none bg-indigo-100 mb-1 px-4 py-4 rounded"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />

          <div className="mb-4 block">
            <button className=" w-full py-2 hover:bg-indigo-800 rounded bg-[#695cfe] text-white">
              Entrar
            </button>
          </div>
          {errors.name?.type === "required" && (
            <p className="text-sm w-full text-center text-zinc-600">
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
