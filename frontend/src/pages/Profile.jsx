import React, { useState } from "react";
import { Input } from "../components";
import { useAuth } from "../context/AuthContext";
import { BASE_API } from "../utils/Constant";
import { CameraIcon } from "../assets/icons";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [credential, setCredential] = useState(
    JSON.parse(localStorage.getItem("credential"))
  );

  const [form, setForm] = useState({
    name: credential.name,
    address: credential.address,
    gender: credential.gender,
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${BASE_API}/user/update/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authUser,
      },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.message === "Update Success") {
          localStorage.setItem("credential", JSON.stringify(response.data));
          setCredential(response.data);
        }
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div className="border-[1.5px] border-gray-300 py-24 px-6">
          <div className="relative">
            <img
              className="border-2 border-gray-300 mx-auto w-[150px] sm:w-[250px] h-[150px] sm:h-[250px] object-cover rounded-full"
              src={"http://127.0.0.1:8000/photos/" + credential.photo}
              alt="profile"
            />
            <div className="absolute right-[30%] top-[80%] bg-white border-2 border-gray-300 cursor-pointer px-2 py-2 rounded-full">
              <img onClick={() => navigate("/profile/photo")} className="w-[25px] h-[25px]" src={CameraIcon} alt="icon"/>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h1 className="text-xl sm:text-2xl font-bold">{credential.name}</h1>
            <p className="text-sm sm:text-md mt-2">{credential.email}</p>
            <p className="text-sm sm:text-md">{credential.address}</p>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold">Edit Profile</h1>
          <form method="post" onSubmit={handleSubmit}>
            <div className="space-y-6 py-12">
              <div className="flex flex-col gap-2">
                <label>Nama Lengkap</label>
                <Input onChange={handleInput} name="name" value={form.name} />
              </div>
              <div className="flex flex-col gap-2">
                <label>Alamat</label>
                <Input
                  onChange={handleInput}
                  name="address"
                  value={form.address}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Jenis Kelamin</label>
                <select
                  onChange={handleInput}
                  defaultValue={form.gender}
                  name="gender"
                  className="border-[1.5px] border-gray-300 text-md outline-none py-2 px-4"
                >
                  <option value={credential.gender}>
                    {credential.gender === "male" ? "Laki-laki" : "Perempuan"}
                  </option>
                  <option
                    value={credential.gender === "male" ? "female" : "male"}
                  >
                    {credential.gender === "male" ? "Perempuan" : "Laki-Laki"}
                  </option>
                </select>
              </div>
              <div>
                <button className="bg-black text-white py-3 px-6 text-sm font-semibold w-full">
                  Edit Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
