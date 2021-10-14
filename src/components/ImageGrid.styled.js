import styled from "styled-components";

export const Tiles = styled.div`
  /* background-color: rgba(255, 255, 255, 0.8); */
  background-color: ${({ reveal }) =>
    reveal ? "none" : "rgba(255, 255, 255, 0.8)"};
  /* border: solid 1px black; */
  border: ${({ isDone }) => (isDone ? "none" : "solid 1px black")};
  /* transition: border 500ms; */
`;
