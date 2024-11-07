import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import forgetPassAnimation from "../../assets/auth/forgetPassword.json"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type TRegistrationFormData = {
    email: string
  }

const ForgetPassword = () => {
    const { register, handleSubmit } = useForm<TRegistrationFormData>();


     //handle registration
  const onSubmit= async (data) => {
    const toastId = toast.loading("Registering in");

    // try {
    //   const registerInfo = {
    //     email: data.email,
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

                <div className="w-full md:w-5/6 lg:w-5/12">
                    <div className="text-[#04080F] mb-5">
                        <h2 className="font-semibold text-xl leading-9 text-center">Forget Password ?</h2>
                        <p className="text-sm font-normal leading-5 text-center mt-1">Enter your email to get a password reset link.</p>
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
                      <div className="pt-6">
                        <Button type="submit" className="uppercase rounded-lg px-4 lg:px-5 bg-[#463684] w-full hover:bg-green-700 hover:text-white">
                            Reset Password
                        </Button>
                      </div>
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