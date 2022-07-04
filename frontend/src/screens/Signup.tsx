import Header from "../components/login-signup/Header";
import Signup from "../components/login-signup/Signup";

export default function SignupPage() {
  return (
    <>
      <Header
        heading="Signup to create your account"
        paragraph="Already have an account? "
        linkName="login"
        linkUrl="/"
      />
      <Signup />
    </>
  );
}
