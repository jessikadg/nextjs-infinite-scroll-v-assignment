import styled from "styled-components";

// I created this file following atomic design principles, and trying to emulate an experience
// common to most companies the files are imported from another library. I understand that
// each organisation has its best practices on where to store such components (sometimes in-file, sometimes separately)

export const ImagesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
  margin-top: 3rem;
  width: 100%;
  max-width: 1500px;
  justify-content: center;
`;

export const Card = styled.div`
  width: 300px;
  height: 200px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`;

export const HoverOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const Header = styled.p`
  font-size: x-large;
  color: white;
  font-weight: bolder;
  margin-bottom: 6px;
`;

export const SubHeader = styled.p`
  font-style: italic;
  font-size: medium;
  margin-top: 6px;
`;

export const HoverTextDivider = styled.hr`
  width: 86px;
  text-align: center;
  margin: 0 auto;
  height: 2px;
  background-color: white;
  border: none;
`;

export const FavouriteButton = styled.button`
  border: 1px solid white;
  border-radius: 24px;
  color: white;
  padding: 6px 14px;
  background-color: transparent;
  text-align: center;
  font-size: medium;
  position: absolute;
  bottom: 20px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  transform: translateX(-50%);
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const LoadingText = styled.h2``;
