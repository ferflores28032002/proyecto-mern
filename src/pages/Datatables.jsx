import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Datatables = ({ columns, data }) => {
  const [search, setsearch] = useState("");
  const [filtrado, setfiltrado] = useState([]);

  useEffect(() => {
    const resultado = data.filter((elemento) => {
      return elemento.title.toLowerCase().match(search.toLocaleLowerCase());
    });
    setfiltrado(resultado);
  }, [search]);

  return (
    <div className="shadow-2xl p-4 rounded-xlp">
      <DataTable
        columns={columns}
        data={filtrado}
        pagination={true}
        subHeader
        highlightOnHover
        pointerOnHover
        fixedHeaderScrollHeight="300px"
        fixedHeader
        responsive
        subHeaderComponent={
          <div>
            <input
              type="text"
              className="w-full placeholder:text-sm placeholder:text-white text-white border-1 outline-none bg-indigo-400 mb-4 px-4 py-2 rounded "
              placeholder="Has tu busqueda.."
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>
        }
      />
    </div>
  );
};

export default Datatables;
