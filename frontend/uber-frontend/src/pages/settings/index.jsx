import { useUser } from "../../context/userContext";
import { useNavigate,Link  } from "react-router-dom";
const SettingPage = () => {
    const {logout,user} = useUser();
    const userData = user?JSON.parse(user):{};
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
            {/* <div className="w-[30%] border-zinc-200 border-4 rounded-full mt-4 relative overflow-hidden max-h-[62%]">
                    <img src={profileData?.image?`${profileData.image}`:"/images/user.jpg"} className=" rounded-full min-h-[98px]" alt="" />
                    <i onClick={openFile} className="ri-camera-fill p-2 bg-white absolute bottom-0 right-0 rounded-full py-1"></i>
                </div> */}
                <div className="rounded-full overflow-hidden w-1/8 relative max-h-[62%]">
                    <img src={window.$showImage(userData.image)} className=" rounded-full min-h-[50px]" />
                </div>
                <div>
                    <h2 className="text-md font-semibold">{userData?.fullname?.firstname} {userData?.fullname?.lastname}</h2>
                    <p className="text-[12px] text-zinc-800 font-semibold">{userData?.email}</p>
                </div>
            </div>
        </div>
        <div>
            <div className="p-2 pl-5 py-3 text-md font-semibold text-zinc-700 border-b-2 border-zinc-200">
                <Link to="/user/profile"><i className="ri-user-line mr-4"></i>Profile</Link>
            </div>
            <div className="p-2 pl-5 py-3 text-md font-semibold text-zinc-700 border-b-2 border-zinc-200">
                <Link to="/setting/pasword/update"><i className="ri-lock-line mr-4"></i>Update Password</Link>
            </div>
            <div className="p-2 pl-5 py-3 text-md font-semibold text-zinc-700 border-b-2 border-zinc-200">
                <Link to="/setting/account"><i className="ri-organization-chart mr-4"></i>Account</Link>
            </div>
            <div className="p-2 pl-5 py-3 text-md font-semibold text-zinc-700 border-b-2 border-zinc-200">
                <Link to="/ride/history"><i className="ri-history-line mr-4"></i>Ride History</Link>
            </div>
            <div className="px-2 absolute bottom-1 w-full">
                <button onClick={logout} className="text-red-400 border-red-400 border-3 px-3 py-2 w-full rounded-lg font-semibold text-lg"><i className="ri-logout-box-line mr-2"></i>Logout</button>
            </div>
        </div>
        </>
    );
}
export default SettingPage;