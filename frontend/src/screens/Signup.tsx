import Header from "../components/login-signup/Header";
import Signup from "../components/login-signup/Signup";

export default function SignupPage() {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Signup to create your account"
          paragraph="Already have an account? "
          linkName="login"
          linkUrl="/"
        />
        <Signup />
      </div>
    </div>
  );
}
