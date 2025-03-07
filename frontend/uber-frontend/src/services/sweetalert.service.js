import Swal from 'sweetalert2'
const toastFun = ({ status, title, text = "" }) => {
    if (status == 'success' || status == 'error')
        Swal.fire({
            icon: status,
            text,
            toast: true,
            title,
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false,
            position: "top-end",
        });
}
export const toast = toastFun;
export const confirmBox = (title, text,confirmText,cancelText) => {
    return Swal.fire({
        icon: status,
        text,
        showCancelButton: true,
        title,
        showConfirmButton: true,
        position: "top-end",
        confirmButtonColor: "#28b54b",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmText??"OK",
        cancelButtonText: cancelText??"Cancel",
    });
};