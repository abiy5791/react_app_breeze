import React, { useState } from "react";
import useAuthContext from "../context/AuthContext";
import axios from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
  const { fetchCsrfToken } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchCsrfToken();
    setErrors([]);
    setStatus(null);
    setIsSubmitting(true); // Update submission status
    try {
      const response = await axios.post("/forgot-password", { email });
      setStatus(response.data.status);
      setEmail("");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    } finally {
      setIsSubmitting(false); // Reset submission status
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
                <div className="bg-green-700 m-2 p-2 rounded text-white">
                  {status} Please check your email !
                </div>
              )}
              <div className="mb-10 text-center md:mb-16">
                <h6>
                  Forgot your password ? ok don't worry please write you email
                  we will send reset link on your email !
                </h6>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  {errors.email && (
                    <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {errors.email[0]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-10">
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
            disabled:opacity-50" // Add this to disable the button when submitting
                    disabled={isSubmitting} // Disable the button when submitting
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
