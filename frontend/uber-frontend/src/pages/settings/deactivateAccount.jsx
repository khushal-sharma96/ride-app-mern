import { useState } from "react";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const DeactivateAccount = () => {
    const navigate = useNavigate();
    const [reason, setReason] = useState();
    const {logout} = useUser();
    const deactivate = async () => {
        try {
            const response = await window.$axios.post('/user/account/deactivate', { reason });
            if (response.status) {
                logout();
                navigate('/user/login');
            }
            else window.$toast({
                type:'error',
                title:response.message
            });
        }
        catch (err) {
            console.log(err);
            window.$toast({
                type:'error',
                title:"Something went wrong!"
            });
        }
    }
    return (
        <div className="p-3">
            <img src="/images/delete.png" className="w-1/2 mx-auto mt-[15%]" alt="" />
            <h2 className="text-yellow-500 text-3xl font-bold text-center">Deactivate Account</h2>
            <p className="text-zinc-500 text-md font-semibold text-center mt-1">By doing this, your account has been permanently deleted. You can't login again using the account. </p>
            <textarea onChange={(e) => setReason(e.target.value)} name="" className="bg-zinc-200 w-full rounded-lg mt-8 font-semibold p-3" placeholder="Enter the reason..." rows="4" id=""></textarea>
            <button onClick={deactivate} className="border-red-400 rounded-lg border-3 p-3 w-[90%] text-red-400 text-xl font-bold absolute bottom-4 left-[5%]">Deactivate Account</button>
        </div>
    );
}
export default DeactivateAccount;