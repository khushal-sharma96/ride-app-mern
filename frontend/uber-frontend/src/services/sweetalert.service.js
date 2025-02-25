import Swal from 'sweetalert2'
const toastFun = ({ status, title, text = "" }) => {
    if (status == 'success')
        Swal.fire({
            type: "success",
            toast: true,
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false,
            position: "top-end",
        });
}
export const toast = toastFun;