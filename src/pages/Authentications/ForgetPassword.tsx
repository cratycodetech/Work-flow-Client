/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import forgetPassAnimation from "../../assets/auth/forgetPassword.json"
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setAdmin } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { useResetPassMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

type TFormData = {
    email: string
    newPassword: string
    confirmPassword: string
  }

const ForgetPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<TFormData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [resetPass] = useResetPassMutation();

  //password show or not
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Move to the next step if validation passes
  const nextStep = async () => {
    const valid = await trigger(); 
    if (valid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Submit the form on the last step
  const onSubmit: SubmitHandler<TFormData> = async (data) => {
    const toastId = toast.loading("Resetting Password...");

    try {
      const formInfo = {
        email: data.email,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      };
      console.log(formInfo);

      const responseData = await resetPass(formInfo).unwrap();
      dispatch(setAdmin({ admin: responseData }));
      toast.success("Reset Data Done.", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.error("Something went wrong!", { id: toastId, duration: 2000 });
      }
    }
  };


    return (
        <div>
            <div className="bg-[#F0F4FA]">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-10 max-w-[90%] lg:h-screen py-10 mx-auto p-2">

                <div className="w-full md:w-5/6 lg:w-5/12">
                    <div className="text-[#04080F] mb-5">
                        <h1 className="font-semibold text-xl leading-9 text-center">
                          {currentStep === 1 ? "Forget Password ?" : "Password Reset"}
                        </h1>
                        <p className="text-sm font-normal leading-5 text-center mt-1">
                          {currentStep === 1 ? "Enter your email to get a password reset link." : "Enter your new password." }                        
                        </p>
                    </div>

                   <div className="bg-[#FFFFFF] p-5 rounded-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    {currentStep === 1 && (
                        <div>
                          <div className="mt-4">
                            <label className="block mb-2 text-sm font-normal text-[#04080F]">
                              Email
                            </label>
                            <input
                              className="shadow bg-[#C9C9C9] text-sm bg-opacity-15 rounded w-full py-3 px-3 text-[#04080F]"
                              type="email"
                              {...register("email", { required: "Email is required", pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email address" } })}
                              placeholder="Email"
                              required
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                              )}
                          </div>
                          <div className="pt-6">
                            <Button onClick={nextStep} className="uppercase rounded-lg px-4 lg:px-5 bg-[#463684] w-full hover:bg-green-700 hover:text-white">
                                Reset Password
                            </Button>
                          </div>
                        </div>
                       )}

                      {currentStep === 2 && (
                      <>
                          <div className="mt-4">
                              <label className="block mb-2 text-sm font-normal text-[#04080F]">
                                  New Password
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
                                  {...register("newPassword", { required: "new Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                                  placeholder="New Password"
                                />
                              </div>
                              {errors.newPassword && (
                                  <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
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
                                  {...register("confirmPassword", { required: "Please confirm your password", validate: (value) => value === watch("newPassword") || "Passwords do not match"})}                                  placeholder="Confirm Password"
                                />                           
                              </div>
                              {errors.confirmPassword && (
                                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                                )}
                          </div>
                          <div className="pt-6">
                            <Button type="submit" className="uppercase rounded-lg px-4 lg:px-5 bg-[#463684] w-full hover:bg-green-700 hover:text-white">
                              Reset Password
                            </Button>
                          </div>
                      </>
                    )}
                    </form>

                    <div className="flex items-center justify-between mt-4 bg-[#FFFFFF] p-4 py-2 rounded-lg">
                      <span className="text-base text-[text-[#04080F]] flex mx-auto">
                            Remember your password?{" "}
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

                <div className="">
                    <div className="w-full flex items-center justify-center lg:border-b lg:border-l lg:border-gray-300">
                      <Lottie className="" animationData={forgetPassAnimation} />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ForgetPassword;