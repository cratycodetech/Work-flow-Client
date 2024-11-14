/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import mainAnimation from "../../assets/auth/mainAnimation.json";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import { FaEyeSlash } from "react-icons/fa";
import { TRegistrationFormData } from "@/types/auth";
import { useAppDispatch } from "@/redux/hook";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import { setAdmin } from "@/redux/features/auth/authSlice";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<TRegistrationFormData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signUp] = useSignUpMutation();

  //password show or not
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Move to the next step if validation passes
  const nextStep = async () => {
    const valid = await trigger();  // This will validate the fields in the current step
    if (valid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Submit the form on the last step
  const onSubmit: SubmitHandler<TRegistrationFormData> = async (data) => {
    const toastId = toast.loading("Registering...");

    try {
      const registerInfo = {
        adminId: data.adminId,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      await signUp(registerInfo).unwrap();
      dispatch(setAdmin({ admin: registerInfo }));
      toast.success("Registration complete.", { id: toastId, duration: 2000 });
      navigate("/login");
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.error("Something went wrong!", { id: toastId, duration: 2000 });
      }
    }
  };

  // Watch password to validate confirm password
  const password = watch("password");

  return (
    <div>
      <div className="bg-[#F0F4FA]">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 max-w-[90%] lg:h-screen mx-auto p-2">
          <div>
            <div className="text-[#04080F] mb-5">
              <h2 className="font-semibold text-xl leading-9 text-center">Welcome to Admin Panel</h2>
              <h1 className="font-semibold text-2xl text-center">
                {currentStep === 1 ? "Register" : "Confirm Registration"}
              </h1>
              <p className="text-sm font-normal leading-5 text-center mt-1">
                Register to access the admin tools and manage settings with ease.
              </p>
            </div>
  
            <div className="bg-[#FFFFFF] p-5 rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 1 && (
                  <div>
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-normal text-[#04080F]">Admin ID</label>
                      <input
                        className="shadow bg-[#C9C9C9] text-sm bg-opacity-15 rounded w-full py-3 px-3 text-[#04080F]"
                        type="text"
                        // {...register("adminId", { required: true, minLength: 6 })}
                        {...register("adminId", { required: "Admin ID is required", minLength: { value: 4, message: "Admin ID must be at least 4 characters long" } })}
                        placeholder="Admin ID"
                      />
                      {errors.adminId && (
                        <p className="text-red-500 text-sm mt-1">{errors.adminId.message}</p>
                      )}
                    </div>
                    <div className="pt-6">
                      <Button onClick={nextStep} className="uppercase rounded-lg px-4 lg:px-5 bg-[#463684] w-full hover:bg-green-700 hover:text-white">
                        Next
                      </Button>
                    </div>
                  </div>
                )}
  
                {currentStep === 2 && (
                  <>
                      <div className="mt-4">
                            <label className="block mb-2 text-sm font-normal text-[#04080F]">
                              Email
                            </label>
                            <input
                              className="shadow bg-[#C9C9C9] text-sm bg-opacity-15 rounded w-full py-3 px-3 text-[#04080F]"
                              type="email"
                              {...register("email", { required: "Email is required", pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email address" } })}
                              name="email"
                              placeholder="Email"
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                      </div>
                      <div className="mt-4">
                          <label className="block mb-2 text-sm font-normal text-[#04080F]">
                              Password
                          </label>
                          <div className="relative flex items-center mt-2">
                            {showPassword ? (
                              <Eye
                                className="password-toggle mt-2 absolute right-3 focus:outline-none rtl:left-0 rtl:right-auto"
                                onClick={togglePasswordVisibility}
                              />
                            ) : (
                              <FaEyeSlash
                                className="password-toggle mt-2 absolute right-3 focus:outline-none rtl:left-0 rtl:right-auto"
                                onClick={togglePasswordVisibility}
                              />
                            )}
                            <input
                              className="shadow bg-[#C9C9C9] text-sm bg-opacity-15 rounded w-full py-3 px-3 text-[#04080F]"
                              type={showPassword ? "text" : "password"}
                              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                              name="password"
                              placeholder="Password"
                            />
                          </div>
                          {errors.password && (
                              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                      </div>
                      <div className="mt-4">
                          <label className="block mb-2 text-sm font-normal text-[#04080F]">
                              Confirm Password
                          </label>
                          <div className="relative flex items-center mt-2">
                            {showPassword ? (
                              <Eye
                                className="password-toggle mt-2 absolute right-3 focus:outline-none rtl:left-0 rtl:right-auto"
                                onClick={togglePasswordVisibility}
                              />
                            ) : (
                              <FaEyeSlash
                                className="password-toggle mt-2 absolute right-3 focus:outline-none rtl:left-0 rtl:right-auto"
                                onClick={togglePasswordVisibility}
                              />
                            )}
                            <input
                              className="shadow bg-[#C9C9C9] text-sm bg-opacity-15 rounded w-full py-3 px-3 text-[#04080F]"
                              type={showPassword ? "text" : "password"}
                              {...register("confirmPassword", { required: "Please confirm your password", validate: value => value === password || "Passwords do not match" })}
                              name="confirmPassword"
                              placeholder="Confirm Password"
                            />                           
                          </div>
                          {errors.confirmPassword && (
                              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                            )}
                      </div>
                      <div className="pt-6">
                        <Button type="submit" className="uppercase rounded-lg px-4 lg:px-5 bg-[#463684] w-full hover:bg-green-700 hover:text-white">
                          Register
                        </Button>
                      </div>
                  </>
                )}
              </form>
              <div className="flex items-center justify-between mt-4 bg-[#FFFFFF] p-4 py-2 rounded-lg">
                <span className="text-base text-[text-[#04080F]] flex mx-auto">
                Already have an account?{" "}
                  <Link
                    to="/login"
                    className="hover:text-slate-500 font-semibold text-[#463684] pl-2"
                  >
                     Login
                  </Link>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative py-2 w-8 h-32 bg-white border border-gray-200 rounded-full flex flex-col items-center">
              <div className="w-6 h-6 bg-white border-4 border-[#463684] rounded-full mt-1"></div>
              <div className="w-[2px] bg-gray-300 absolute top-6 bottom-6"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full mt-auto mb-1"></div>
            </div>
          </div>

          <div className="">
              <div className="w-full flex items-center justify-center lg:border-b lg:border-l lg:border-gray-300">
                <Lottie animationData={mainAnimation} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
