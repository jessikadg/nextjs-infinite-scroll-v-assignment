import React from "react";
import { LoadingContainer, LoadingText } from "./styled/AtomicComponents";
import { LoadingProps } from "@/types/types";

const Loading: React.FC<LoadingProps> = ({ text }) => {
  // Potential Improvements: a better loooking loading state, or even better - a "Skeleton" UI
  return (
    <LoadingContainer>
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
