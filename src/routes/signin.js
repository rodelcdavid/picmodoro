import React from "react";
import { Link } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import { Wrapper } from "../utils/globalstyles";

const SignIn = () => {
  return (
    <Wrapper>
      <SignInForm />
    </Wrapper>
  );
};

export default SignIn;
