import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, closeModal, setcloseModal, titulo }) => {
  return (
    <>
      {closeModal && (
        <Overlay>
          <ContenedorModal>
            <ContenedorHeader>
              <h1>{titulo ? titulo : "Hola"}</h1>
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
  background: rgba(0, 0, 0, 0.6);
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;

  h1 {
    z-index: 999;
    font-weight: 500;
    font-size: 16px;
    color: #1766dc;
  }
`;

const BottonCerrar = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 30px;
  border: none;
  background-color: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #818cf8;
  font-weight: 500;

  &:hover {
    background: #f2f2f2;
  }
`;
