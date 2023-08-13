import {MutableRefObject, useRef, useState} from "react";
import {useStateContext} from "@/contexts/ContextProvider";
import {LoginRequest, LoginResponse} from "@/shared/types";
import axios from "axios";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

type Props = {};

const Login = ({}: Props) => {

  const validateInput = () => {
    const emailField = emailRef.current?.value;
    const passwordField = passwordRef.current?.value;
    const frontendErrors = {};

    if (emailField.length === 0 || passwordField.length === 0) {
      frontendErrors[0] = "Empty fields";
    }
    if (!String(emailField).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      frontendErrors[1] = "Not a valid email address";
    }
    return frontendErrors;
  };

  const {setToken} = useStateContext();
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const axiosClient = axios.create();
  const [errors, setErrors] = useState({});

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setErrors({});

    let frontendErrors = validateInput();
    if (Object.keys(frontendErrors).length !== 0) {
      setErrors(frontendErrors);
      return;
    }

    const payload: LoginRequest = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value
    };

    axiosClient.post("http://localhost:8081/api/v1/auth/login", payload)
      .then(({data}) => {
        const response = data as LoginResponse;
        setToken(response.accessToken);
      })
      .catch(function (error) {
        if ("response" in error) {
          if ("errors" in error.response.data) {
            const stringErrors = error.response.data.errors;
            stringErrors.forEach((string, index) => {
              errors[index + 1] = string.charAt(0).toUpperCase() + string.slice(1);
              setErrors(errors);
            })
          } else {
            if (error.response.data.status === 401) {
              setErrors({0: "Incorrect email or password"});
            }
          }
        } else {
          setErrors({0: "Server didn't respond"});
        }
      });
  };

  const flex = "flex flex-col items-center";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.5}}
      transition={{duration: 0.5}}
      variants={{
        hidden: {opacity: 0, y: -50},
        visible: {opacity: 1, y: 0},
      }}
    >
      <div className="mt-20 mx-auto xs:w-11/12 md:w-4/12 pt-6">
        <div className="my-20 border-2 border-gray-500 py-6">
          <form className={`${flex}`}>
            <h1 className="text-2xl">Login into your account</h1>
            {errors &&
              <div className="text-red-400 text-center">
                {Object.keys(errors).map(key => (<p key={key}>{errors[key]}</p>))}
              </div>
            }
            <div className={`${flex} gap-3 pt-5`}>
              <input ref={emailRef} type="email" placeholder="Email"
                     className="border-2 border-gray-500 w-full h-10 pl-2 focus:outline-none focus:border-red-600"/>
              <input ref={passwordRef} type="password" placeholder="Password"
                     className="border-2 border-gray-500 w-full h-10 pl-2 focus:outline-none focus:border-red-600"/>
              <button onClick={handleSubmit}
                      className="border-2 border-gray-500 w-full h-10 hover:bg-red-400">
                Login
              </button>
              <p className="">
                Not Registered? <Link to="/signup" className="text-blue-600 hover:text-red-400">
                Create an account
              </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;