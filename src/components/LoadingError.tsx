import React from "react";
import styled from "styled-components";

interface ErrorProps {
  errorMessage: string;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ErrorTitle = styled.h2`
  font-size: 24px;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  color: black;
`;

const Error: React.FC<ErrorProps> = ({ errorMessage }) => {
  // potential improvements: customise the error component according to the type
  // of error: network error, server error, or if "Unauthorized" say something like
  // "please double check your API Key" etc.
  return (
    <ErrorContainer>
      <ErrorTitle>Something went wrong :(</ErrorTitle>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </ErrorContainer>
  );
};

export default Error;
