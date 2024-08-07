import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    data = { ...data, role: "user" };
    try {
      const result = await axios.post("http://localhost:3000/register", data);
      toast.success(result.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 z-5">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Register for Learnify
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
              {...register("name")}
              name="name"
              className="rounded-lg relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 sm:text-md"
              placeholder="Name"
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>
          <div>
            <input
              {...register("email")}
              name="email"
              className="rounded-lg relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 sm:text-md"
              placeholder="Email"
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-500 hover:text-blue-500"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
