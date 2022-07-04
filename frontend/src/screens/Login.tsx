import Header from "../components/login-signup/Header";
import Login from "../components/login-signup/Login";

export default function LoginPage() {
  return (
    <>
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <Login />
    </>
  );
}
