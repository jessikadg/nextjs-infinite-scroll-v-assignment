import React from "react";
import { LoadingContainer, LoadingText } from "./styled/AtomicComponents";
import { LoadingProps } from "@/types/types";

const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <LoadingContainer>
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
