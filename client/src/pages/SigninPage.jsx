import { useState } from "react";
import logo from "../assets/xlogo.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

function SigninPage() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const location = useLocation();
  const from = location.state;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await axios.post(`/api/auth/signin`, inputs, {
        withCredentials: true,
      });
      dispatch(signInSuccess(res.data.others));
      toast.success(res.data.message);
      navigate(from || "/");
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(signInFailure());
    }
  };
  return (
    <section className="max-w-[1400px] mx-auto bg-transparent overflow-hidden h-screen flex items-center justify-center">
      <div className="hidden  md:flex">
        <img
          className="lg:max-w-[500px] md:max-w-[350px] md:max-h-[350px] lg:max-h-[500px] object-cover"
          src={logo}
          alt=""
        />
      </div>
      <div className=" flex flex-col items-center justify-center lg:ml-10 md:pr-4">
        <img src={logo} className="md:hidden w-[80px] h-[80px] my-5" />
        <h1 className="text-[35px] md:text-[45px]  lg:text-[65px] mb-10 font-extrabold">
          Happening Now
        </h1>
        <h2 className="text-[20px] md:text-[25px] lg:text-[30px] mb-6 font-semibold">
          Welcome back.
        </h2>
        <form className="flex flex-col gap-5">
          <Input
            placeholder={"username"}
            className={"p-3 border border-gray-500 text-sm"}
            onChange={handleChange}
            name={"username"}
          />
          <Input
            placeholder={"password"}
            className={"p-3 border border-gray-500 text-sm"}
            onChange={handleChange}
            name={"password"}
            type={"password"}
          />
          <Button
            name={"sign in"}
            onClick={handleSubmit}
            className={
              "p-2 bg-[#1DA1F2] text-white w-full rounded-full font-bold"
            }
            loading={loading}
            color={"white"}
          />
          <div className="flex flex-col gap-2">
            <p className="text-center font-semibold mt-5">
              Don't have an account?
            </p>
            <Link
              className={
                "p-2 text-[#1DA1F2] text-center bg-transparent border border-gray-500 w-full rounded-full font-bold"
              }
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SigninPage;
