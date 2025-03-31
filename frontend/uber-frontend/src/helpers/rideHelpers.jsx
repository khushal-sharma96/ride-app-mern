import { useNavigate } from "react-router-dom";
export const cancelRide = async (rideId,navigate) => {
    try {
        const response = await window.$axios.get(`/user/ride/cancel/${rideId}`);
        if (response.status)
            navigate('/');
        else window.$toast({ status: 'error', title: response?.message ?? "Something went wrong!" });
    }
    catch (err) {
        console.log(err);
        window.$toast({ status: 'error', title: err?.response?.data?.message ?? "Something went wrong!" });
    }
}