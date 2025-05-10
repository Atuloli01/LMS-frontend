import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

// 👇 Import your logo here
import gehuLogo from "@/assets/gehu-logo.png"; // Replace with correct path

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }
    if (registerError) {
      toast.error(registerError.data?.message || "Signup Failed");
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data?.message || "Login Failed");
    }
  }, [
    navigate,
    registerIsSuccess,
    registerData,
    registerError,
    loginIsSuccess,
    loginData,
    loginError,
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0e6fa] to-[#dbeafe] dark:from-gray-900 dark:to-gray-800 relative px-4">
      {/* University Logo and Name */}
      <div className="absolute top-24 flex flex-col items-center text-center">
        {" "}
        {/* Adjusted top value */}
        <img
          src={gehuLogo}
          alt="GEHU Logo"
          className="w-20 h-20 mb-2 drop-shadow-lg"
        />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">
          Graphic Era Hill University
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Bhimtal Campus
        </p>
      </div>

      <div className="absolute z-0 top-0 left-0 right-0 flex items-center justify-center opacity-10 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-700 dark:text-white text-center">
          GRAPHIC ERA HILL UNIVERSITY
        </h1>
      </div>

      {/* Form Tabs */}
      <Tabs
        defaultValue="login"
        className="z-10 w-full max-w-md bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-300 dark:border-gray-700 shadow-2xl"
      >
        <TabsList className="grid w-full grid-cols-2 rounded-t-xl">
          <TabsTrigger value="signup" className="text-md py-2">
            Sign Up
          </TabsTrigger>
          <TabsTrigger value="login" className="text-md py-2">
            Login
          </TabsTrigger>
        </TabsList>

        {/* Sign Up */}
        <TabsContent value="signup">
          <Card className="bg-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-gray-800 dark:text-white">
                Create Your Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required
                />
              </div>
              <Button
                className="w-full"
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Login */}
        <TabsContent value="login">
          <Card className="bg-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-gray-800 dark:text-white">
                Welcome Back
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  required
                />
              </div>
              <Button
                className="w-full"
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging In...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
