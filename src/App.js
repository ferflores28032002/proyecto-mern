import React, { useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import {
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
  Cargos,
  Carrito,
} from "./components";
import {
  Dashboard,
  Inventario,
  Categorias,
  Empleados,
  Stacked,
  Pyramid,
  Usuarios,
  Proveedores,
  Password,
  Roles,
  Permisos,
  Financial,
  Informacion,
  ColorMapping,
  Ventas,
  RealizarVenta,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import { AiOutlinePlus } from "react-icons/ai";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg ">
        {/* <div
          className="fixed right-4 bottom-4 opacity-0"
          style={{ zIndex: "1000" }}
        >
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div> */}

        <div className="fixed right-8 bottom-6 " style={{ zIndex: "1000" }}>
          <TooltipComponent content="Nueva Venta" position="Top">
            <Link to="/realizarventas">
              <button
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <AiOutlinePlus />
              </button>
            </Link>
          </TooltipComponent>
        </div>

        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}

            <Routes>
              {/* dashboard  */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/Dashboard" element={<Dashboard />} />

              {/* pages  */}
              <Route path="/Inventario" element={<Inventario />} />
              <Route path="/empleados" element={<Empleados />} />
              <Route path="/usuarios" element={<Usuarios />} />

              {/* apps  */}
              <Route path="/Proveedores" element={<Proveedores />} />
              <Route path="/Ventas" element={<Ventas />} />
              <Route path="/Categorias" element={<Categorias />} />
              <Route path="/Informacion/:id" element={<Informacion />} />
              <Route path="/realizarventas" element={<RealizarVenta />} />
              <Route path="/cart" element={<Carrito />} />

              {/* charts  */}
              <Route path="/Password" element={<Password />} />
              <Route path="/Roles" element={<Roles />} />
              <Route path="/Permisos" element={<Permisos />} />
              <Route path="/Cargos" element={<Cargos />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/color-mapping" element={<ColorMapping />} />
              <Route path="/pyramid" element={<Pyramid />} />
              <Route path="/stacked" element={<Stacked />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
