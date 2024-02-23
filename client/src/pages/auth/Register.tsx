import { AuthLayout } from "@/layouts";
import { RegisterForm } from "@/components/auth";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col w-full gap-7 justify-center items-center">
        <h1 className="text-4xl text-gray-700 font-bold">Create Account</h1>

        <RegisterForm />

        <div className="flex gap-1 text-sm">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
