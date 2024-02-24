import { LoginForm } from "@/components/auth";
import { AuthLayout } from "@/layouts";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col w-full gap-7 justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl text-gray-700 font-bold">Login</h1>
          <p className="text-gray-500">Please sign in to continue</p>
        </div>

        <LoginForm />

        <div className="flex gap-1 text-sm">
          <p>Don&apos;t have an account?</p>
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
