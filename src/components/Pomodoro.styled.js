import styled from "styled-components";

export const ImageBlocker = styled.div`
  /* background-color: rgba(255, 255, 255, 0.8); */
  background-color: ${({ reveal }) =>
    reveal ? "none" : "rgba(255, 255, 255, 0.8)"};
  border: solid 1px black;
`;
