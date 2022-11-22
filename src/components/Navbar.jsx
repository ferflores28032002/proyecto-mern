import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { useSelector } from "react-redux";

import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-4 md:mr-6 relative shadow-lg mt-4">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <button
          onClick={() => handleClick("cart")}
          className="p-2 flex items-center relative mr-2"
        >
          <div className="text-blue-900">
            <FiShoppingCart size={20} />
          </div>
          <span className="absolute flex items-center justify-center text-[0.8rem] h-6 w-6 top-0 -right-2 rounded-full bg-purple-500 p-1 text-white">
            {cart.length}
          </span>
        </button>

        <Link to="/cart" className="p-2 flex items-center relative mr-2">
          <div className="text-blue-900">
            <FiShoppingBag size={20} />
          </div>
          <span className="absolute flex items-center justify-center text-[0.8rem] h-6 w-6 top-0 -right-2 rounded-full bg-yellow-500 p-1 text-white">
            {cart.length}
          </span>
        </Link>

        <NavButton
          title="usuarios"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<BiUser />}
        />
        <TooltipComponent content="Perfil" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              src={user.data?.image_url}
              alt="user-profile"
            />
            <p>
              {/* <span className="text-gray-400 text-14"></span>{" "} */}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user?.data?.name}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
