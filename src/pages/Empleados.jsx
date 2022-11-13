import { useEffect, useState } from "react";
import Datatables from "./Datatables";
import Modal from "../components/Modal";
import { IoPersonAddSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useCargos, useEmpleados } from "../hooks/";


const Empleados = () => {

  const columns = [
    {
      name: "Nombres",
      selector: (row) => row.name,
    },
    {
      name: "Apellidos",
      selector: (row) => row.surnames,
    },
    {
      name: "Sexo",
      selector: (row) => row.sex,
    },
    {
      name: "Telefono",
      selector: (row) => row.telephone,
    },
  
    {
      name: "Cargo",
      selector: (row) => row.cargo.name,
    },
    {
      name: "Dirección",
      selector: (row) => row.direction,
    },
    {
      name: "Opciones",
      selector: (row) => (
        <button
          onClick={()=> deleteEmpleados(row.id)}
        >Eliminar</button>
      ),
    },
  ];
  
  const [closeModal, setcloseModal] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { empleados, loadempleados, addEmpleados, deleteEmpleados } = useEmpleados()
  const { cargos , loadCargos} = useCargos()

  useEffect(() => {
    loadempleados();
    loadCargos()
  }, []);


  // Datos del formulario
  const onSubmit = (data) => {
    addEmpleados(data)
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Modal closeModal={closeModal} setcloseModal={setcloseModal} titulo="Agregar nuevo usuario">
        

        <form  onSubmit={handleSubmit(onSubmit)} >
          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Nombres"
            {...register("name")}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Apellidos"
            {...register("surnames")}
          />
          <input
            type="number"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Edad"
            {...register("age")}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Teléfono"
            {...register("telephone")}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Salario"
            {...register("salary")}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Dirección"
            {...register("direction")}
          />
          <div>
            <div>
              <input 
                id="mas" 
                type="radio" 
                value="Masculino" 
                {...register("sex")}  
              />
              <label htmlFor="mas">Masculino</label>
            </div>
            <div>
              <input 
                id="fem" 
                type="radio" 
                value="Femenino" 
                {...register("sex")} 
              />
              <label htmlFor="fem">Femenino</label>
            </div>
          </div>

          <select 
           {...register("idCargo")} 
          >
            {
              cargos.map(cargo => (

                <option key={cargo.id} value={cargo.id}>{cargo.name}</option>
              ))
            }
          </select>

          <div>
            <button>Crear Empleado</button>
          </div>
        </form>

      </Modal>
        
      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        <IoPersonAddSharp />
        Agregar
      </button>

      <Datatables columns={columns} data={empleados} />
    </div>
  );
};
export default Empleados;
