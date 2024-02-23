import { ReactNode } from "react";

// components
import { Navbar } from "@/components/shared";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
};

export default RootLayout;
