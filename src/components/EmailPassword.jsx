import { useForm } from "react-hook-form";
import emailLogo from "../assets/imagenes/email.svg";
import { HiOutlineMail } from "react-icons/hi";
import { useUsuarios } from "../hooks/useUsuarios";

const EmailPassword = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { EnviarGmalNodemailer } = useUsuarios();

  const LoginData = (data) => {
    EnviarGmalNodemailer(data);

    reset();
  };

  return (
    <div className="w-full min-h-screen bg-[#695cfe] flex justify-center items-center">
      <div className="max-w-md mx-2 py-8 p-10 shadow-2xl rounded bg-white">
        <img src={emailLogo} className="h-72" alt="logo de la empresa" />

        <form className="mt-8" onSubmit={handleSubmit(LoginData)}>
          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="email"
              {...register("email", {
                required: true,
              })}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <HiOutlineMail className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="mt-4 block mb-1">
            <button className=" w-full py-2 hover:bg-indigo-800 rounded bg-[#695cfe] text-white">
              Enviar
            </button>
          </div>
          {(errors.email?.type || errors.password?.type) === "required" && (
            <p className="text-sm w-full  text-center text-zinc-600">
              ¡Asegurate de rellenar los campos!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmailPassword;
