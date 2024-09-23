import Swal from "sweetalert2";
import { useStateContext } from "../contexts/ContextProvider";

export default function Toast() {
  const { toast } = useStateContext();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  if (toast.show && toast.message) {
    Toast.fire({
      icon: toast.icon,
      title: toast.message
    });
  }

  return null;
}
