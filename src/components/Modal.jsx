import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";

const Modal = ({ children, closeModal, setcloseModal, titulo, bac, color, icono, info }) => {
  return (
    <>
      {closeModal && (
        <Overlay>
          <ContenedorModal>
            <ContenedorHeader>
              <div className="flex gap-3 py-2 border-b-1 border-color px-2 hover:bg-light-gray cursor-pointer">
                <button
                  type="button"
                  style={{ color: `${ color ? color : `#03C9D7`}`, backgroundColor: `${bac ? bac : `#E5FAFB`}` }}
                  className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                >
                  {icono ? icono : <FaUserTie /> }
                </button>

                <div>
                  <p className="font-semibold">{info ? info : "modulo"}</p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {titulo ? titulo : "Añadir"}
                  </p>
                </div>
              </div>
            </ContenedorHeader>

            <BottonCerrar onClick={() => setcloseModal(false)}>
              <IoClose size={25} />
            </BottonCerrar>

            {/* Elementos del modal */}

            {children}
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default Modal;

// Estilos del modal para usarse repetitivamente

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContenedorModal = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 100px;
  background-color: #fff;
  position: relative;
  z-index: 999;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
`;

const ContenedorHeader = styled.div`
  z-index: 999;
  margin-bottom: 15px;
`;

const BottonCerrar = styled.button`
  position: absolute;
  top: 18px;
  right: 20px;
  width: 40px;
  border: none;
  background-color: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #818cf8;
  font-weight: bold;


`;
