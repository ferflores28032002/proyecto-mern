import { useState } from "react";
import Swal from "sweetalert2";
import { FaUserCircle } from "react-icons/fa";
import { CambioPassword } from "../../store/hooks/CambioPassword";
import { Header } from "../../components";
import { RiUserSettingsLine } from "react-icons/ri";

const Line = () => {
  const initialState = "";
  const [password1, setpassword1] = useState(initialState);
  const [password2, setpassword2] = useState(initialState);
  const [password, setpassword] = useState(initialState);
  const { updatePassword } = CambioPassword();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      Swal.fire(
        "Campos Incorrectos",
        "Asegurate de que las contraseñas sean iguales",
        "info"
      );
    } else if (password === "" || password1 === "" || password2 === "") {
      Swal.fire(
        "Campos Incorrectos",
        "Asegurate de rellenar todos los campos",
        "info"
      );
    } else {
      updatePassword(password, password2);
      setpassword(initialState);
      setpassword1(initialState);
      setpassword2(initialState);
    }
  };

  return (
    <div className="m-2 md:mx-10 p-2 md:px-10 bg-white rounded-3xl">

      <Header title="Cambia tu Contraseña" color="#ffffff" bac="#a5b4fc" icono={<RiUserSettingsLine/>} />
      <div className=" flex items-center justify-center">
      <div className="p-8 shadow-2xl rounded-xl">
        <FaUserCircle
          size={100}
          className="text-[#818cf8] w-full text-center pb-4"
        />
        <form onSubmit={handleSubmit} className="px-6 max-w-xl">
          <input
            type="password"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-1"
            placeholder="Nueva contraseña"
            value={password1}
            onChange={(e) => setpassword1(e.target.value)}
          />

          <input
            type="password"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded  focus:border-1"
            placeholder="Repite la nueva contraseña"
            value={password2}
            onChange={(e) => setpassword2(e.target.value)}
          />
          <input
            type="password"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded  focus:border-1"
            placeholder="Contraseña actual"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          <div className="mb-4 block">
            <button className=" w-full py-2  rounded bg-[#818cf8] text-white">
              Actualizar
            </button>
          </div>
        </form>
      </div>
      </div>

    </div>
  );
};

export default Line;
