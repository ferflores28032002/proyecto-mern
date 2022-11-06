import Swal from "sweetalert2";

export const Alertas = () => {
  Swal.fire({
    title: "¡Completa los campos!",
    text: "¡Los campos estan vacios!",
    icon: "warning",
  });
};
