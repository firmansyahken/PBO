import React, { useState } from "react";
import { Input, Validation } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API } from "../utils/Constant";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [active, setActive] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE_API}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((response) => {
        if (response.message === "Login Success") {
          localStorage.setItem("auth_token", response.token);
          localStorage.setItem("credential", JSON.stringify(response.data));
          setAuthUser(response.token);
          return navigate("/");
        } else if (response.message === "Invalid Credentials") {
          return setActive(!active);
        }
        return setError(response.message);
      });
  };

  return (
    <>
      <div className="flex max-w-[920px] mx-auto items-center h-screen w-full">
        <div className="w-full px-6 py-6">
          <div className="grid grid-cols-2 items-center gap-x-12">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1513682121497-80211f36a7d3?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
            <div>
              <form onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold">Masuk</h1>
                <div className="space-y-6 py-12">
                  <div className="flex flex-col gap-2">
                    <label>Email</label>
                    <Input onChange={handleInput} name="email" type="text" />
                    <Validation message={error && error.email} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Password</label>
                    <Input
                      onChange={handleInput}
                      name="password"
                      type="password"
                    />
                    <Validation message={error && error.password} />
                  </div>
                  <button className="bg-black text-white py-3 px-6 text-sm font-semibold w-full">
                    Masuk
                  </button>
                  <p className="text-sm text-gray-400 text-center mt-12">
                    Tidak Mempunyai Akun? 
                    <Link to="/register" className="text-black">
                      Daftar Sekarang
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
