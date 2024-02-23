import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row justify-evenly gap-10 lg:gap-20 items-center min-h-screen p-3">
      <img
        src="/images/vms-graphics.png"
        alt="Vehicle Management System"
        className="h-44 w-fit md:h-56 lg:h-96"
      />
      {children}
    </div>
  );
};

export default AuthLayout;
