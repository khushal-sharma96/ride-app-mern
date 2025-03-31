import { useState } from "react";

const UpdatePassword = () => {
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: ""
    });
    const updatePassword = async () => {
        try {
            if(!password?.newPassword)
                console.log("New password can not be null!");
            if(!password?.oldPassword)
                console.log("Old password can not be null!");
            const response = await window.$axios.post("/user/password/update", password);
            if (response.status) {
                console.log("Data Updated!");
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
            <div className="w-full rounded-t-lg">
                <img src="/images/modify-password.gif" className="w-1/2 mx-auto mt-[10%]" alt="" />
                <h2 className="text-2xl text-yellow-400 font-semibold text-center mb-[15%]">Update Password</h2>
                <div className="bg-yellow-400 rounded-xl p-2 absolute bottom-[-10px] h-[55vh] w-full">
                    <div className="p-2">
                        <label htmlFor="" className="font-semibold text-white text-lg blockwhite">Old Password</label>
                        <input type="text"
                            onChange={(e) => setPassword((prevData) => {
                                prevData.oldPassword = e.target.value;
                                return { ...prevData };
                            })}
                            className="w-full my-1 p-2 py-3 bg-white rounded-lg font-semibold" placeholder="Old Password" />
                    </div>
                    <div className="p-2">
                        <label htmlFor="" className="font-semibold text-white text-lg blockwhite">New Password</label>
                        <input type="text"
                            onChange={(e) => setPassword((prevData) => {
                                prevData.newPassword = e.target.value;
                                return { ...prevData };
                            })}
                            className="w-full my-1 p-2 py-3 bg-white rounded-lg font-semibold" placeholder="New Password" />
                    </div>
                    <div className="px-3 mt-3">
                        <button onClick={updatePassword} className="p-2 w-full border-3 border-white rounded-lg text-white font-semibold text-xl">Update Password</button>
                    </div>
                </div>

            </div>
    );
}
export default UpdatePassword;