import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { useSelector } from "react-redux";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";
import ButtonCerrarSesion from "./ButtonCerrarSesion";
import Button from "./Button";
import { FaUserTie } from "react-icons/fa";
import { BsFillTelephoneForwardFill, BsShield } from "react-icons/bs";


const UserProfile = () => {
  const { currentColor } = useStateContext();
  const { user } = useSelector((state) => state.auth);
  const { UserLogout } = UseSliceAuth();

  return (
    <div className="nav-item absolute right-1 shadow-2xl top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">
          Perfil del usuario
        </p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={user?.data?.image_url}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            {user?.data.empleado.name}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            {user?.data?.role.name}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            {user?.data.email}{" "}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
          <button
            type="button"
            style={{ color: "#03C9D7", backgroundColor: "#E5FAFB" }}
            className=" text-xl rounded-lg p-3 hover:bg-light-gray"
          >
            <FaUserTie />
          </button>

          <div>
            <p className="font-semibold dark:text-gray-200 ">Mi Perfil</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {" "}
              {user?.data?.empleado.name} &nbsp;
              {user?.data?.empleado.surnames}
            </p>
          </div>
        </div>

        <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
          <button
            type="button"
            style={{
              color: "rgb(0, 194, 146)",
              backgroundColor: "rgb(235, 250, 242)",
            }}
            className=" text-xl rounded-lg p-3 hover:bg-light-gray"
          >
            <BsShield />
          </button>

          <div>
            <p className="font-semibold dark:text-gray-200 ">Usuario</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {" "}
              {user?.data?.name}
            </p>
          </div>
        </div>

        <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
          <button
            type="button"
            style={{
              color: "rgb(255, 244, 229)",
              backgroundColor: "rgb(254, 201, 15)",
            }}
            className=" text-xl rounded-lg p-3 hover:bg-light-gray"
          >
            <BsFillTelephoneForwardFill />
          </button>

          <div>
            <p className="font-semibold dark:text-gray-200 ">Dirección</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {" "}
              {user?.data?.empleado.telephone}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <ButtonCerrarSesion
          color="white"
          bgColor={currentColor}
          text="Cerrar Sesión"
          borderRadius="10px"
          width="full"
          funcion={() => UserLogout()}
        />
      </div>
    </div>
  );
};

export default UserProfile;
