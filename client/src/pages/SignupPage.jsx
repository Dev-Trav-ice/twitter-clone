import { useState } from "react";
import logo from "../assets/xlogo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import Button from "../components/Shared/Button";
import Input from "../components/Shared/Input";

function SignupPage() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await axios.post(
        "https://twitter-clone-xntj.onrender.com/api/auth/signup",
        inputs,
        {
          withCredentials: true,
        }
      );
      dispatch(signInSuccess(res.data.others));
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(signInFailure());
    }
  };

  return (
    <section className="max-w-[1400px] mx-auto bg-transparent overflow-hidden h-screen flex items-center justify-center p-4">
      <div className="hidden  md:flex">
        <img
          className="lg:max-w-[500px] md:max-w-[350px] md:max-h-[350px] lg:max-h-[500px] object-cover"
          src={logo}
          alt=""
        />
      </div>
      <div className=" flex flex-col items-center justify-center lg:ml-10 md:pr-4">
        <img src={logo} className="md:hidden w-[80px] h-[80px] my-5" />
        <h1 className="text-[35px] md:text-[45px]  lg:text-[55px] mb-5 font-extrabold">
          Happening Now
        </h1>
        <h2 className="text-[20px] md:text-[25px] lg:text-[30px] mb-6 font-semibold">
          Join today.
        </h2>
        <form className="flex flex-col gap-5">
          <Input
            placeholder={"username"}
            className={"p-3 border border-gray-500 text-sm"}
            onChange={handleChange}
            name={"username"}
          />
          <Input
            placeholder={"name"}
            className={"p-3 border border-gray-500 text-sm"}
            onChange={handleChange}
            name={"name"}
          />
          <Input
            placeholder={"email"}
            className={"p-3 border border-gray-500 text-sm"}
            onChange={handleChange}
            name={"email"}
          />
          <Input
            placeholder={"password"}
            className={"p-3 border border-gray-500 text-sm"}
            onChange={handleChange}
            name={"password"}
            type={"password"}
          />
          <Button
            name={"create account"}
            loading={loading}
            onClick={handleSubmit}
            className={
              "p-2 bg-[#1DA1F2] text-white w-full rounded-full font-bold"
            }
            color={"white"}
          />
          <div className="flex flex-col gap-2">
            <p className="text-center font-semibold mt-3">
              Already have an account?
            </p>
            <Link
              className={
                "p-2 text-[#1DA1F2] text-center bg-transparent border border-gray-500 w-full rounded-full font-bold"
              }
              to="/signin"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignupPage;
