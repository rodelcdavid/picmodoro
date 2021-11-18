import { styled } from "@mui/system";

const UpArrow = styled("div")`
  @keyframes uparrow {
    0% {
      -webkit-transform: translateY(0);
      opacity: 0.4;
    }
    100% {
      -webkit-transform: translateY(-0.4em);
      opacity: 0.9;
    }
  }
  position: absolute;
  top: -112px;
  right: 4px;
  border-color: transparent;
  border-style: solid;
  border-width: 0 1rem;
  display: ${({ guide }) => (guide ? "block" : "none")};
  /* display: ${({ isGuided }) => isGuided}; */
  /* display: ${(props) => (props.$isGuided ? "block" : "none")} */
  height: 0;
  margin: 10em auto;
  opacity: 0.4;
  transform-origin: 50% 50%;
  width: 0;

  animation: uparrow 0.6s infinite alternate ease-in-out;
  border-bottom: 0.8rem solid #4dc126;
`;

export default UpArrow;
