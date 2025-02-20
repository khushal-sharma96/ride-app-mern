import { useUser } from "../../context/userContext";
import { useNavigate  } from "react-router-dom";
const SettingPage = () => {
    const {logout} = useUser();
    const navigate = useNavigate ();
    const goBack = ()=>navigate(-1)
    return (
        <>
        <div className="container bg-yellow-400 p-2">
            <h2 className="text-xl font-semibold mb-5">
                <i className="ri-settings-2-line mr-3"></i>Settings
            </h2>
            <i onClick={goBack} className="ri-arrow-left-line font-bold text-xl rounded-full absolute top-2 right-2"></i>
            <div className="flex gap-4 items-center py-2">
                <div className="rounded-full overflow-hidden w-1/8 relative">
                    <img src="/images/user.jpg" />
                </div>
                <div>
                    <h2 className="text-md font-semibold">Khushal Sharma</h2>
                    <p className="text-[12px] text-zinc-800 font-semibold">khushal@yopmail.com</p>
                </div>
            </div>
        </div>
        <div>
            <div className="p-2 pl-5 py-3 text-md font-semibold text-zinc-700 border-b-2 border-zinc-200">
                <h2><i className="ri-user-line mr-4"></i>Profile</h2>
            </div>
            <div className="p-2 pl-5 py-3 text-md font-semibold text-zinc-700 border-b-2 border-zinc-200">
                <h2><i className="ri-lock-line mr-4"></i>Update Password</h2>
            </div>
            <div className="p-2 pl-5 py-3 text-md font-semibold text-zinc-700 border-b-2 border-zinc-200">
                <h2><i className="ri-organization-chart mr-4"></i>Account</h2>
            </div>
            <div className="px-2 absolute bottom-1 w-full">
                <button onClick={logout} className="text-red-400 border-red-400 border-3 px-3 py-2 w-full rounded-lg font-semibold text-lg"><i className="ri-logout-box-line mr-2"></i>Logout</button>
            </div>
        </div>
        </>
    );
}
export default SettingPage;