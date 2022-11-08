import { Header } from "../components";
import Datatables from "./Datatables";

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Year",
    selector: (row) => row.year,
  },
  {
    name: "edad",
    selector: (row) => row.edad,
  },
  {
    name: "image",
    selector: (row) => row.image,
  },
];
const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
    edad: "123",
    image: "123",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
    edad: "1234",
    image: "123",
  },
  {
    id: 3,
    title: "Ghostbusters",
    year: "1984",
    edad: "jjej",
    image: "123",
  },
];

const Empleados = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* <Header category="Page" title="Empleados" /> */}

      <Datatables columns={columns} data={data} />
    </div>
  );
};
export default Empleados;
