import React from "react";
import SidebarProvider from "./SidebarContext";
import ChatsProvider from "./ChatsContext";
import CurrentChatMessageProvider from "./CurrentChatMessageContext";
import PromptProvider from "./PromptContext";
import { useLocation } from "react-router-dom";

const Contexts = ({ children }) => {

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const conversationId = queryParams.get("conversation");

  return <ChatsProvider>
    <CurrentChatMessageProvider conversationId={conversationId}>
      <PromptProvider>
        {children}
      </PromptProvider>
    </CurrentChatMessageProvider>
  </ChatsProvider>
};

export default Contexts;
