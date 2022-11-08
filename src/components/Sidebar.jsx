import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center mx-2 gap-4 pl-7 pt-3 pb-2.5 rounded animate__animated  animate__zoomInDown text-white  text-md"; //m-2
  const normalLink = `flex items-center gap-4 pl-7 pt-3 pb-2.5 rounded-lg text-md text-[#b4b7bd] dark:text-gray-200 mx-2 hover:bg-slate-700 `; //m-2

  return (
    <div
      className={` h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10  shadow-lg bg-[#283046] 
  
    `}
    >
      {activeMenu && (
        <>
          <div className={`flex justify-between items-center`}>
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-9 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware className="text-blue-800" />{" "}
              <span className="text-blue-800">Shoppy</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <p className="text-[#676d7d] text-sm dark:text-gray-400 ml-9 mt-10 uppercase">
            Módulos
          </p>
          <div className="mt-4 ">
            {links.map((item) => (
              <div key={item.title}>
                {/* <p className="text-[#b4b7bd] dark:text-gray-400 m-5 mt-4 uppercase">
                  {item.title}
                  
                </p> */}
                {item.links.map((link, i) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span
                      style={{
                        animationDuration: "1s",
                      }}
                      className="capitalize"
                    >
                      {link.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
