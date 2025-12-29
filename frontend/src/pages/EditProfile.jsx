import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";


function EditProfile() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState(userData?.name || "")
  const [description, setDescription] = useState(userData?.description || "")
  const [photoUrl, setPhotoUrl] = useState(userData?.photoUrl || "")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setDescription(userData.description || "");
      setPhotoUrl(userData.photoUrl || "");
    }
  }, [userData]);

  const formData = new FormData()
  formData.append("name", name)
  formData.append("description", description)
  formData.append("photoUrl", photoUrl)


  const handleEditProfile = async () => {
    setLoading(true)
    try {
        const result = await axios.post(serverUrl + "/api/user/profile", formData, {withCredentials: true})
        dispatch(setUserData(result.data))
        setLoading(false)
        navigate("/profile")
        toast.success("Profile Updated Successfully")
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.response.data.message || "Something went wrong")
      
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <FaArrowLeft
          className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>
        <form action="" className="space-y-5" onSubmit={(e)=> e.preventDefault()}>
          <div className="flex flex-col items-center text-center">
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                className="w-24 h-24 rounded-full object-cover border-4 border-[black]"
                alt=""
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-green-500">
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

            <div>
              <label htmlFor="image" className="text-sm font-medium text-gray-700" >Select Avatar</label>
              <input id="image" type="file" 
              name="photoUrl"
              placeholder="PhotoUrl"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-md text-sm"
              onChange={(e)=>setPhotoUrl(e.target.files[0])} />
            </div>

            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700" >User Name</label>
              <input id="name" type="text" 
              name="name"
              placeholder={userData?.name}
              value={name}
              className="w-full px-4 py-2 border rounded-md text-sm"
              onChange={(e)=>setName(e.target.value)} />
            </div>

             <div>
              <label className="text-sm font-medium text-gray-700" >Email</label>
              <input type="text" readOnly
              placeholder={userData?.email}
              className="w-full px-4 py-2 border rounded-md text-sm" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700" >Bio</label>
              <textarea type="text"
              name="description"
              placeholder="Tell us about yourself"
              rows={3}
              value={description}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring focus:ring-[black]" 
              onChange={(e)=>setDescription(e.target.value)} />
            </div>
            <button className="w-full bg-[black] active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer" disabled={loading} onClick={handleEditProfile}>{loading ? <ClipLoader size={30} color='white'/> : "Save Changes"}</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
