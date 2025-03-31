import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/userContext";

const UserProfile = () => {
    const inputField = useRef();
    const userContext = useUser();
    const [profileData, setProfileData] = useState({
        fullname: {
            firstname: "",
            lastname: ""
        },
        image: null,
        email: ""
    });
    const openFile = () => {
        console.log(inputField.current.click());
    }
    const selectFile = (event) => {
        if (event?.target?.files) {
            let file;
            file = event.target.files[0];
            // if(Array.isArray(event.target.files))
            // else files = event.target.files;
            const image = URL.createObjectURL(file);
            profileData.newImage = file;
            setProfileData((prevData) => {
                return { ...prevData, image }
            });
        }
    }
    const fetchProfile = async () => {
        try {
            const response = await window.$axios.get("/user/profile");
            if (response.status) {
                if (response?.data?.image)
                    response.data.image = `${import.meta.env.VITE_BASE_URL}/${response.data.image}`;
                setProfileData(response.data);
                return;
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
    };
    const updateUser = async () => {
        try {
            const formdata = new FormData();
            formdata.append('fullname', JSON.stringify(profileData.fullname));
            formdata.append('image', profileData.newImage ?? null);
            if (profileData?.userType == '2') {
                if (profileData?.vehicleNumber && profileData?.vehicleType) {
                    formdata.append('vehicleNumber', (profileData.vehicleNumber));
                    formdata.append('vehicleType', profileData.vehicleType);
                }
            }
            const response = await window.$axios.post("/user/profile", formdata);
            if (response.status) {
                userContext.updateUser(response.data);
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
    useEffect(() => {
        fetchProfile();
    }, [])
    return (
        <div >
            <div className="bg-yellow-400 h-[30vh] w-full p-3">
                <h2 className="text-3xl font-semibold text-white">Profile</h2>
                <div className="w-[30%] border-zinc-200 border-4 rounded-full mt-4 relative overflow-hidden max-h-[62%]">
                    <img src={profileData?.image ? `${profileData.image}` : "/images/user.jpg"} className=" rounded-full min-h-[98px]" alt="" />
                    <i onClick={openFile} className="ri-camera-fill p-2 bg-white absolute bottom-0 right-0 rounded-full py-1"></i>
                </div>
            </div>
            <div>
                <div className="p-2">
                    <label htmlFor="" className="font-semibold block">First Name</label>
                    <input type="text"
                        onChange={(e) => setProfileData((prevData) => {
                            prevData.fullname.firstname = e.target.value;
                            console.log(e.target.value);
                            return { ...prevData };
                        })}
                        value={profileData?.fullname?.firstname}
                        className="w-full my-1 p-2 py-3 bg-zinc-300 rounded-lg font-semibold" placeholder="First name" />
                </div>
                <div className="p-2">
                    <label htmlFor="" className="font-semibold block">Last Name</label>
                    <input type="text"
                        value={profileData?.fullname?.lastname}
                        onChange={(e) => setProfileData((prevData) => {
                            prevData.fullname.lastname = e.target.value;
                            return { ...prevData };
                        })}
                        className="w-full my-1 p-2 py-3 bg-zinc-300 rounded-lg font-semibold" placeholder="Last name" />
                </div>
                <div className="p-2">
                    <label htmlFor="" className="font-semibold block">Email</label>
                    <input value={profileData?.email} readOnly type="email" className="w-full my-1 p-2 py-3 bg-zinc-300 rounded-lg font-semibold" placeholder="Email" />
                </div>
                {
                    profileData?.userType == '2' ?
                        <div className="flex">
                            <div className="p-2">
                                <label htmlFor="" className="font-semibold block">Vehicle Type</label>
                                <select type="text" id="password" placeholder="John" value={profileData?.vehicleType} onChange={(e => {
                                    setProfileData((prevData) => {
                                        profileData.vehicleType = e.target.value;
                                        return { ...prevData };
                                    })
                                })} className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1">
                                    <option value="2">Two Wheeler</option>
                                    <option value="3">Three Wheeler</option>
                                    <option value="4">Four Wheeler</option>
                                </select>
                            </div>
                            <div className="p-2">
                                <label htmlFor="" className="font-semibold block">Vehicle Number</label>
                                <input value={profileData?.vehicleNumber} onChange={(e => {
                                    setProfileData((prevData) => {
                                        profileData.vehicleNumber = e.target.value;
                                        return { ...prevData };
                                    })
                                })}  type="email" className="w-full my-1 p-2 py-3 bg-zinc-300 rounded-lg font-semibold" placeholder="Email" />
                            </div>
                        </div>
                        : ""
                }

                <div className="px-3">
                    <button onClick={updateUser} className="p-2 w-full border-3 border-yellow-400 rounded-lg text-yellow-400 font-semibold text-xl">Update Profile</button>
                </div>

                <input type="file" ref={inputField} className="hidden" onChange={selectFile} />

            </div>
        </div>
    );
}
export default UserProfile;