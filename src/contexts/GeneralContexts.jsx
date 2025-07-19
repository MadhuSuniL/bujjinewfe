import React from "react";
import SidebarProvider from "./SidebarContext";
import ModalsProvider from "./ModalsContext";

const GeneralContexts = ({ children }) => {


  return <ModalsProvider>
    <SidebarProvider>
      {children}
    </SidebarProvider >
  </ModalsProvider>
};

export default GeneralContexts;
