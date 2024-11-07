import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import mainAnimation from "../../assets/auth/mainAnimation.json"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

type TRegistrationFormData = {
    email: string
    password: string
    confirmPass: string
  }

const ConfirmRegistration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit } = useForm<TRegistrationFormData>();

    //handle show pass or not
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

     //handle registration
  const onSubmit= async (data) => {
    const toastId = toast.loading("Registering in");

    // try {
    //   const registerInfo = {
    //     email: data.email,
    //     password: data.password,
    //     confirmPass: data.confirmPass,
    //   };

    //   await registration(registerInfo).unwrap();
    //   dispatch(setUser({ user: registerInfo }));
    //   toast.success("Registration Done.", { id: toastId, duration: 2000 });
    //   navigate("/");
    // } catch (error) {
    //   toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    // }
  };

    return (
        <div>
            <div className="bg-[#F0F4FA]">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-10 max-w-[90%] lg:h-screen py-10 mx-auto p-2">

                <div className="">
                    <div className="text-[#04080F] mb-5">
                        <h2 className="font-semibold text-xl leading-9 text-center">Welcome to Admin Panel</h2>
                        <p className="text-sm font-normal leading-5 text-center mt-1">Register to access the admin tools and manage settings with ease.</p>
                    </div>
                   <div className="bg-[#FFFFFF] p-5 rounded-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-4">
                          <label className="block mb-2 text-sm font-normal text-[#04080F]">
                            Email
                          </label>
                          <input
                            className="shadow bg-[#C9C9C9] text-sm bg-opacity-15 rounded w-full py-3 px-3 text-[#04080F]"
                            type="email"
                            {...register("email")}
                            name="email"
                            placeholder="Email"
                            required
                          />
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
                                {...register("password")}
                                name="password"
                                placeholder="Password"
                                required
                              />
                            </div>
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
                                {...register("confirmPass")}
                                name="confirmPass"
                                placeholder="Confirm Password"
                                required
                              />
                            </div>
                        </div>
                
                      <div className="pt-6">
                        <Button type="submit" className="uppercase rounded-lg px-4 lg:px-5 bg-[#463684] w-full hover:bg-green-700 hover:text-white">
                          Register
                        </Button>
                      </div>
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

export default ConfirmRegistration;