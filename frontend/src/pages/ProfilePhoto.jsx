import React, { useState } from "react";
import { Input } from "../components";
import { useAuth } from "../context/AuthContext";
import { BASE_API } from "../utils/Constant";
import axios from "axios";

const ProfilePhoto = () => {
  const { authUser } = useAuth();
  const [credential, setCredential] = useState(
    JSON.parse(localStorage.getItem("credential"))
  );

  const [photo, setPhoto] = useState(null);

  const handleUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      await axios.post(`${BASE_API}/user/update/photo`, formData, {
        headers: {
          Authorization: "Bearer " + authUser,
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        localStorage.setItem("credential", JSON.stringify(response.data.data));
        setCredential(response.data.data);
      })
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div className="border-[1.5px] border-gray-300 py-24 px-6">
          <img
            className="border-2 border-gray-300 mx-auto w-[150px] sm:w-[250px] h-[150px] sm:h-[250px] object-cover rounded-full"
            src={"http://127.0.0.1:8000/photos/" + credential.photo}
            alt="profile"
          />
          <div className="mt-6 text-center">
            <h1 className="text-xl sm:text-2xl font-bold">{credential.name}</h1>
            <p className="text-sm sm:text-md mt-2">{credential.email}</p>
            <p className="text-sm sm:text-md">{credential.address}</p>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold">Edit Photo</h1>
          <form method="post" onSubmit={handleSubmit}>
            <div className="space-y-6 py-12">
              {photo && (
                <img
                  src={URL.createObjectURL(photo)}
                  className="w-[150px] h-[150px] object-cover"
                />
              )}
              <div className="flex flex-col gap-2">
                <Input onChange={handleUpload} type="file" name="photo" />
              </div>
            </div>
            <button type="submit" className="bg-black text-white py-3 px-6 text-sm font-semibold">Ubah</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePhoto;
