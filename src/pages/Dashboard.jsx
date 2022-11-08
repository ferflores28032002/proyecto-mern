import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="m-24">
      <Link
        className="mt-8 py-4 px-6 bg-[#695cfe] shadow-2xl text-white font-semibold rounded-lg"
        to="/realizarventas"
      >
        Realizar Ventas
      </Link>
    </div>
  );
};

export default Dashboard;
