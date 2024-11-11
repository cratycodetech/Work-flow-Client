import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/auth/loginAnimation.json"
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { setAdmin } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { useLoginMutation } from "@/redux/features/auth/authApi";

type TLoginFormData = {
    email: string
    password: string
  }

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<TLoginFormData>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();

    //handle show pass or not
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

  //handle login
  const onSubmit : SubmitHandler<TLoginFormData> = async (data) => {
    const toastId = toast.loading("logging in");
    try {
      const loginInfo = {
        email: data.email,
        password: data.password,
      };
      
      const res = await login(loginInfo).unwrap()
      // console.log("Login Response:", res);  

      const token = res.data.token;
      console.log("token:",token);

      dispatch(setAdmin({admin: loginInfo, token: token}))
      toast.success("Login Done.", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

    return (
        <div>
            <div className="bg-[#F0F4FA]">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-10 max-w-[80%] lg:h-screen py-10 mx-auto p-2">

                <div className="">
                    <div className="text-[#04080F] mb-5">
                        <h2 className="font-semibold text-xl leading-9 text-center">Welcome to Admin Panel</h2>
                        <p className="text-sm font-normal leading-5 text-center mt-1">Access your account to manage settings, monitor activity, and keep everything organized.</p>
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
                            {...register("email", { required: "Email is required", pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email address" } })}
                            name="email"
                            placeholder="Email"
                            required
                          />
                          {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-normal text-[#04080F]">
                                    Password
                                </label>
                              <a href="/forget" className="text-xs text-[#04080F] hover:underline">
                                Forget Password?
                              </a>
                            </div>
                            
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
                                required
                              />
                            </div>
                            {errors.password && (
                              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                            )}
                        </div>
                
                      <div className="pt-6">
                        <Button type="submit" className="uppercase rounded-lg px-4 lg:px-5 bg-[#463684] w-full hover:bg-green-700 hover:text-white">
                          Login
                        </Button>
                      </div>
                    </form>
                    <div className="flex items-center justify-between mt-4 bg-[#FFFFFF] p-4 py-2 rounded-lg">
                      <span className="text-base text-[text-[#04080F]] flex mx-auto">
                            Don’t have any account?{" "}
                        <Link
                          to="/register"
                          className="hover:text-slate-500 font-semibold text-[#463684] pl-2"
                        >
                           Register
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
                      <Lottie className="lg:h-[500px] md:h-[500px] h-full" animationData={loginAnimation} />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Login;