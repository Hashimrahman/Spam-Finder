import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MainContext } from "../Context/Context";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { users, handleLogin } = useContext(MainContext);
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    const user = users.find((user) => user.email === values.email);

    if (!user) {
      alert("User Not Found");
      setSubmitting(false);
    } else if (user.password === values.password) {
      alert("Login Successful!");

      handleLogin(user.id);

      axios
        .patch(`http://localhost:8000/users/${user.id}`, {
          isLoggedIn: true,
        })
        .then(() => {
          console.log("User login success");

          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log("Error updating login status:", err);
          alert("Failed to update login status. Please try again.");
        });

      localStorage.setItem("id", user.id);
      localStorage.setItem("name", user.fullName);
      localStorage.setItem("email", user.email);
    } else {
      alert("Wrong Password");
      setSubmitting(false); 
    }
  };

  return (
    <div className="h-[100vh] p-4 sm:p-20 flex items-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-slate-300 rounded-lg shadow-custom-shadow p-8 md:p-16 w-[100%]">
            <h1 className="text-3xl font-bold text-center md:text-left">
              Login
            </h1>
            <div className="flex flex-row-reverse mb-8 text-sm">
              <div className="w-full">
                <div className="flex flex-col w-full gap-2 mt-4">
                  <label
                    htmlFor="email"
                    className="text-lg font-bold opacity-70"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-red-600"
                  />
                </div>
                <div className="flex flex-col w-full gap-2 mt-4">
                  <label
                    htmlFor="password"
                    className="text-lg font-bold opacity-70"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    className="h-10 rounded-3xl p-4 outline-none focus:border-2 focus:border-slate-600 focus:border-solid"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="text-red-600"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-200 text-base md:text-lg w-3/4 lg:w-1/2 p-2 rounded-full lg:hover:bg-slate-600 lg:hover:text-white transition-all ease-in-out duration-1000"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <p className="mt-2 text-center">
                Not a Member?{" "}
                <Link to="/register">
                  <span className="text-blue-800 hover:cursor-pointer">
                    Register{" "}
                  </span>
                </Link>
                Here
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
