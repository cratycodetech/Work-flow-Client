import { Button } from "@/components/ui/button";
import { FaArrowRightToBracket, FaR } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import welcomeAnimation from "../../assets/auth/welcome.json"


const MainPage = () => {

    return (
        <div>
            <div className="bg-[#F0F4FA]">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-5 max-w-[90%] lg:h-screen mx-auto p-10">
                <div className="">
                    <div className="w-full flex items-center justify-center lg:border-b lg:border-l lg:border-gray-300">
                      <Lottie animationData={welcomeAnimation} />
                    </div>
                </div>

                <div className="flex-none items-center justify-center">
                    <div className="flex items-center justify-center pb-5">
                        <img className="w-16 rounded-full" src="https://i.ibb.co.com/q9j9Y76/PMS-LOGO-1.webp" alt="" />
                    </div>
                    <div className="text-[#04080F] mb-5">
                        <h1 className="font-bold text-2xl leading-9 text-center">Welcome to Admin Panel</h1>
                        <p className="text-sm font-normal leading-5 text-center mt-1">This is your control center where you can manage all aspects of the application.</p>
                    </div>
                    <div className="flex gap-10 items-center justify-center pt-5">
                        <div>
                            <Link to="/login">
                                <Button className="bg-[#463684] text-[#F0F4FA] w-[160px] h-[160px] flex-col rounded-3xl">
                                    <div className="">
                                    <FaArrowRightToBracket className="w-[50px] h-[50px]"></FaArrowRightToBracket>
                                    </div>
                                    <h2 className="font-semibold text-base">Login</h2>
                                </Button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/register">
                                <Button className="bg-[#459895] text-[#F0F4FA] w-[160px] h-[160px] flex-col rounded-3xl">
                                    <div className="border p-1 rounded-full">
                                    <FaR></FaR>
                                    </div>
                                    <h2 className="font-semibold text-base">Register</h2>
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default MainPage;