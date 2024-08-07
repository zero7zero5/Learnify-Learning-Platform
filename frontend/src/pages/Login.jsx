import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { setLoggedIn } from "../redux/slices/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const isInstructorLoggedIn = useSelector(
    (state) => state.instructorReducer.isLoggedIn
  );
  const onSubmit = async (data) => {
    if (isInstructorLoggedIn) {
      return toast.warning("Logout from the Instructor login to continue...");
    }
    try {
      const result = await axios.post("http://localhost:3000/login", data);
      dispatch(setLoggedIn(result.data));
      toast.success("Login Success!");
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 z-5">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Login to Learnify
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <input
              {...register("email")}
              name="email"
              className="rounded-lg relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 sm:text-md"
              placeholder="Email address"
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div>
            <input
              {...register("password")}
              type="password"
              name="password"
              className="rounded-lg relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 sm:text-md"
              placeholder="Password"
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-500 hover:text-blue-500"
          >
            Register Here!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
