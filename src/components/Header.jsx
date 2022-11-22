const Header = ({ title, icono, color, bac }) => (
  <div className=" md:mb-6">
    <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
      <button
        type="button"
        style={{
          color: `${color ? color : `#03C9D7`}`,
          backgroundColor: `${bac ? bac : `#E5FAFB`}`,
        }}
        className=" text-xl rounded-lg p-3 px-4 hover:bg-light-gray"
      >
        {icono}
      </button>

      <div>
        <p className="font-semibold dark:text-gray-200 md:text-[1.5rem]">
          {title}
        </p>
        <p className="text-gray-500 text-sm dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus,
          laborum.
        </p>
      </div>
    </div>
  </div>
);

export default Header;
