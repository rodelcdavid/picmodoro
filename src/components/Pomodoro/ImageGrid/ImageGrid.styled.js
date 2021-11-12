import styled from "styled-components";

export const Tiles = styled.div`
  /* background-color: rgba(255, 255, 255, 0.8); */
  background-color: ${({ reveal }) =>
    reveal ? "none" : "rgba(255, 255, 255, 1)"};

  /* border: solid 1px black; */
  /* transform: ${({ reveal }) => (reveal ? "scale(0)" : "scale(1)")};
  transition: all ease-in 200ms; */
  border: ${({ isDone }) => (isDone ? "none" : "solid 1px black")};
  /* transition: border 500ms; */
`;
