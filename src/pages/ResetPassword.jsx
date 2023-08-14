import React, { useEffect, useState } from "react";
import useAuthContext from "../context/AuthContext";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "../api/axios";
import CircularProgress from "../components/CircularProgress";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const { token } = useParams();
  const { fetchCsrfToken } = useAuthContext();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchCsrfToken();
    setErrors([]);
    setStatus(null);
    setIsLoading(true);
    try {
      const response = await axios.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation,
      });
      setStatus(response.data.status);
      setPassword("");
      setPassword_confirmation("");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };
  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="
      relative
      mx-auto
      max-w-[525px]
      overflow-hidden
      rounded-lg
      bg-white
      py-16
      px-10
      text-center
      sm:px-12
      md:px-[60px]
    "
            >
              {status && (
                <>
                  <div className="bg-green-700 m-2 p-2 rounded text-white">
                    {status}
                  </div>
                  <div>
                    Go to
                    <Link to="/login">
                      <b> Login</b>
                    </Link>
                  </div>
                </>
              )}

              <div className="mb-10 text-center md:mb-16">
                <h6>Add Your New Password</h6>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                  bordder-[#E9EDF4]
                  w-full
                  rounded-md
                  border
                  bg-[#FCFDFE]
                  py-3
                  px-5
                  text-base text-body-color
                  placeholder-[#ACB6BE]
                  outline-none
                  focus:border-primary
                  focus-visible:shadow-none
                "
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-primary focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                  {errors.password && (
                    <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {errors.password[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password Confirmation"
                    value={password_confirmation}
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                    className="
                  bordder-[#E9EDF4]
                  w-full
                  rounded-md
                  border
                  bg-[#FCFDFE]
                  py-3
                  px-5
                  text-base text-body-color
                  placeholder-[#ACB6BE]
                  outline-none
                  focus:border-primary
                  focus-visible:shadow-none
                "
                  />
                </div>

                <div className="mb-10">
                  {isLoading ? (
                    <div className="flex justify-center">
                      <CircularProgress />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="
            w-full
            px-4
            py-3
            bg-indigo-500
            hover:bg-indigo-700
            rounded-md
            text-white
          "
                    >
                      Reset Password
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
