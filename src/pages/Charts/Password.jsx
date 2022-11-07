import { useState } from "react";
import Swal from "sweetalert2";
import { FaUserCircle } from "react-icons/fa";
import { CambioPassword } from "../../store/hooks/CambioPassword";

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
      setpassword(initialState);
      updatePassword(password, password2);
    }
  };

  return (
    <div className="w-full min-h-screen rounded-lg flex items-center justify-center pb-12">
      <div className="p-8 shadow-2xl rounded-xl">
        <FaUserCircle
          size={100}
          className="text-[#695cfe] w-full text-center pb-4"
        />
        <form onSubmit={handleSubmit} className="px-6 max-w-xl">
          <input
            type="password"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Nueva contraseña"
            name="password1"
            onChange={(e) => setpassword1(e.target.value)}
          />

          <input
            type="password"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded  focus:border-2"
            placeholder="Repite la nueva contraseña"
            name="password2"
            onChange={(e) => setpassword2(e.target.value)}
          />
          <input
            type="password"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded  focus:border-2"
            placeholder="Contraseña actual"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
          />

          <div className="mb-4 block">
            <button className=" w-full py-2 hover:bg-indigo-800 rounded bg-[#695cfe] text-white">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Line;
