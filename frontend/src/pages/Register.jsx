import React, { useState } from "react";
import { FlashMessage, Input, Validation } from "../components";
import { Link } from "react-router-dom";
import { BASE_API } from "../utils/Constant";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
    address: "",
  });
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("gender", form.gender);
    formData.append("address", form.address);
    formData.append("photo", photo);

    try {
      await axios.post(`${BASE_API}/user/register`, formData);
      setSuccess(true);
      return e.target.reset();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="flex max-w-[920px] mx-auto items-center h-screen w-full">
      <div className="w-full px-6 py-6">
        {success && <FlashMessage message="Registrasi Berhasil!" />}
        <form onSubmit={handleSubmit} method="post">
          <div className="grid grid-cols-2 items-center gap-x-12 gap-y-6 mt-12">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label>Nama Lengkap</label>
                <Input onChange={handleInput} type="text" name="name" />
                <Validation message={error && error.name} />
              </div>
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <Input onChange={handleInput} type="text" name="email" />
                <Validation message={error && error.email} />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label>Password</label>
                <Input onChange={handleInput} type="password" name="password" />
                <Validation message={error && error.password} />
              </div>
              <div className="flex flex-col gap-2">
                <label>Photo</label>
                <Input onChange={handleUpload} type="file" name="photo" />
                <Validation message={error && error.photo} />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label>Jenis Kelamin</label>
                <select
                  defaultValue={form.gender}
                  name="gender"
                  onChange={handleInput}
                  className="border-[1.5px] border-gray-300 text-md outline-none py-2 px-4"
                >
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
                <Validation message={error && error.gender} />
              </div>
              <div className="flex flex-col gap-2">
                <label>Alamat</label>
                <Input onChange={handleInput} type="text" name="address" />
                <Validation message={error && error.address} />
              </div>
            </div>
            <div className="mt-6">
              {photo && (
                <img
                  className="w-[140px] h-[140px] object-cover mt-2"
                  src={URL.createObjectURL(photo)}
                  alt="Preview"
                />
              )}
            </div>
          </div>
          <button className="bg-black text-white py-3 px-6 text-sm font-semibold w-full mt-6">
            Register
          </button>
          <p className="text-sm text-gray-400 text-center mt-12">
            Sudah Mempunyai Akun?
            <Link to="/login" className="text-black">
              Masuk Sekarang
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
