import React, { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="pl-[270px]">
        <div className="p-10">{children}</div>
      </main>
    </>
  );
};

export default Layout;
