import { useEffect, useState } from "react";
import Datatables from "./Datatables";
import Modal from "../components/Modal";
import { IoPersonAddSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useCargos, useEmpleados, useForms } from "../hooks/";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import sistemaApi from "../Api/sistemaApi";


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
        <div className="flex gap-2 items-center">
          <button
            className="p-1 rounded-lg bg-red-500"
            onClick={() => deleteEmpleados(row.id)}
          >
            <MdDelete size={25} className="text-white" />
          </button>
          <button
            className="p-1 rounded-lg bg-blue-600"
            onClick={()=>editar(row.id)}
          >
            <HiOutlinePencilAlt className="text-white" size={25} />
          </button>
        </div>
      ),
    },
  ];
  
  const [closeModal, setcloseModal] = useState(false);
  const [closeModal2, setcloseModal2] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { empleados, loadempleados, addEmpleados, deleteEmpleados, editEmpleados } = useEmpleados()
  const { cargos , loadCargos} = useCargos()
  const { onInputChange, onResetForm, name, surnames, age, telephone, salary, direction, sex, idCargo, formState, setFormState  } =  useForms({ name: "", surnames: "", age: "", telephone: "", salary: "", direction: "", sex: "", idCargo: ""})

  useEffect(() => {
    loadempleados();
    loadCargos()
  }, [closeModal2]);


  // Datos del formulario
  const onSubmit = (data) => {
    addEmpleados(data)
  }

  const editar = async(id) => {
    const { data } = await sistemaApi.get(`/empleado/${id}`)
    setFormState(data.data)
    setcloseModal2(!closeModal2)
  }

  const editarEmpleado = (e) => {
    e.preventDefault()
    editEmpleados({...formState})
    onResetForm()
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        <IoPersonAddSharp />
        Agregar
      </button>

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
        



      {/* =========================editar================================== */}


      <Modal closeModal={closeModal2} setcloseModal={setcloseModal2} titulo="Agregar nuevo usuario">
        

        <form  onSubmit={editarEmpleado} >
          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Nombres"
            name="name"
            onChange={onInputChange}
            value={name}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Apellidos"
            name="surnames"
            onChange={onInputChange}
            value={surnames}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Edad"
            name="age"
            onChange={onInputChange}
            value={age}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Teléfono"
            name="telephone"
            onChange={onInputChange}
            value={telephone}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Salario"
            name="salary"
            onChange={onInputChange}
            value={salary}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Dirección"
            name="direction"
            onChange={onInputChange}
            value={direction}
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
            name="idCargo"
            onChange={onInputChange}
            value={idCargo}
          >
            {
              cargos.map(cargo => (

                <option key={cargo.id} value={cargo.id}>{cargo.name}</option>
              ))
            }
          </select>

          <div>
            <button>Editar Empleado</button>
          </div>
        </form>

      </Modal>
      
      <Datatables columns={columns} data={empleados} />
    </div>
  );
};
export default Empleados;
