import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthLogin } from "../redux/actions/Auth";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error,
    data: auth,
    isLogin,
  } = useSelector((state) => state.auth);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(AuthLogin(formLogin));
  };

  // conditional loading, data & error
  // Conditional rendering
  useEffect(() => {
    if (isLogin === true) {
      Swal.fire({
        icon: "success",
        text: "Login Success!",
      });
      navigate("/home", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [isLogin, navigate]);
  return (
    <>
      <div>
        <div className="flex flex-row bg-gray-800 text-white">
          <img
            className="hidden md:block w-4/5 h-[100vh]"
            src="./image4.png"
            alt="login"
          />
          <div className="p-5 w-full">
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="flex flex-col justify-center md:mx-20 lg:mx-32 mt-12">
                <h1 className="text-center text-3xl font-bold mb-8">Login</h1>
                <div className="flex ">
                  <div className="w-full px-3 mt-10 mb-5">
                    <label htmlFor="" className="text-md font-semibold px-1">
                      Email :{" "}
                    </label>
                    <div className="flex mt-2">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="text-black text-md w-full -ml-10 pl-5 pr-3 py-4 rounded-lg border-2 border-gray-400 outline-none focus:border-[#112B3C]"
                        placeholder="Enter your Email"
                        required
                        onChange={(e) => {
                          setFormLogin((prevData) => ({
                            ...prevData,
                            email: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex ">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="" className="text-md font-semibold px-1">
                      Password : {""}
                    </label>
                    <div className="flex mt-2">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className=" text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        className="text-black w-full -ml-10 pl-5 pr-3 py-4 rounded-lg border-2 border-gray-400 outline-none focus:border-[#112B3C]"
                        placeholder="Enter Your Password"
                        onChange={(e) => {
                          setFormLogin((prevData) => ({
                            ...prevData,
                            password: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div></div>
                <div className="flex">
                  <div className="w-full px-3 mb-5 mt-5">
                    <button
                      className="hover:bg-[#112B3C] bg-[#205375] border-[#112B3C] border-2 text-white hover:yellow-500 font-bold py-4 rounded-xl transition ease-out w-full"
                      onSubmit={(e) => handleLogin(e)}
                    >
                      Sign In now
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
