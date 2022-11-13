import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategorias, useEmpleados, useRoles } from "../hooks/";


const Dashboard = () => {

  const { roles, loadroles } = useRoles()
  const { categorias, loadcategorias } = useCategorias()
  const { empleados, loadempleados } = useEmpleados()


  useEffect(() => {
    loadroles()
    loadcategorias()
    loadempleados()
  }, [])
  

  return (
    <div className="m-24">
      <Link
        className="mt-8 py-4 px-6 bg-[#695cfe] shadow-2xl text-white font-semibold rounded-lg"
        to="/realizarventas"
      >
        Realizar Ventas
      </Link>
      <button
        className="mt-8 py-4 px-6 bg-[#695cfe] shadow-2xl text-white font-semibold rounded-lg"
     
      >
        Roles del sistema <br />
        {roles.length}
      </button>
      <button
        className="mt-8 py-4 px-6 bg-[#695cfe] shadow-2xl text-white font-semibold rounded-lg"
     
      >
        Categorias del sistema <br />
        {categorias.length}
      </button>
      <button
        className="mt-8 py-4 px-6 bg-[#695cfe] shadow-2xl text-white font-semibold rounded-lg"
     
      >
        Empleados del sistema <br />
        {empleados.length}
      </button>
    </div>
  );
};

export default Dashboard;
