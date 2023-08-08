import {useRef, MutableRefObject, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {RegisterRequest} from "@/shared/types";

const Signup = () => {

  const validateInput = () => {
    const emailField = emailRef.current?.value;
    const passwordField = passwordRef.current?.value;
    const confirmPasswordField = confirmedPasswordRef.current?.value;
    const nameField = nameRef.current?.value;
    const surnameField = surnameRef.current?.value;
    const frontendErrors = {};

    if (emailField.length === 0 || passwordField.length === 0 || confirmPasswordField.length === 0
      || nameField.length === 0 || surnameField.length === 0) {
      frontendErrors[0] = "Empty fields";
    }
    if (!String(emailField).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && emailField.length !== 0) {
      frontendErrors[1] = "Not a valid email address";
    }
    if (passwordField.length !== 0 && confirmPasswordField.length !== 0 && passwordField !== confirmPasswordField) {
      frontendErrors[1] = "The entered passwords are not the same";
    }
    return frontendErrors;
  };

  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const confirmedPasswordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const surnameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const axiosClient = axios.create();
  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState("MALE");
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setErrors({});

    let frontendErrors = validateInput();
    if (Object.keys(frontendErrors).length !== 0) {
      setErrors(frontendErrors);
      return;
    }

    const payload: RegisterRequest = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmedPasswordRef.current?.value,
      name: nameRef.current?.value,
      surname: surnameRef.current?.value,
      sex: selectedOption
    };

    axiosClient.post("http://localhost:8080/api/v1/auth/register", payload)
      .then(() => {
        navigate("/login");
      })
      .catch(function (error) {
        if ("response" in error) {
          if ("errors" in error.response.data) {
            const stringErrors = error.response.data.errors;
            stringErrors.forEach((string, index) => {
              errors[index + 1] = string.charAt(0).toUpperCase() + string.slice(1);
              setErrors(errors);
            })
          }
        } else {
          setErrors({0: "Server didn't respond"});
        }
      });
  };

  const flex = "flex flex-col items-center";
  const inputStyle = "border-2 border-gray-500 w-full h-10 pl-2 focus:outline-none focus:border-red-600";

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
            <h1 className="text-2xl">Sign up for Free</h1>
            {errors &&
              <div className="text-red-400 text-center">
                {Object.keys(errors).map(key => (<p key={key}>{errors[key]}</p>))}
              </div>
            }
            <div className={`${flex} gap-3 pt-5`}>
              <input ref={nameRef} type="text" placeholder="Your name" className={inputStyle}/>
              <input ref={surnameRef} type="text" placeholder="Your surname" className={inputStyle}/>
              <select className={inputStyle} value={selectedOption} onChange={handleSelectChange}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              <input ref={emailRef} type="email" placeholder="Email" className={inputStyle}/>
              <input ref={passwordRef} type="password" placeholder="Password" className={inputStyle}/>
              <input ref={confirmedPasswordRef} type="password" placeholder="Confirm password" className={inputStyle}/>
              <button onClick={handleSubmit}
                      className="border-2 border-gray-500 w-full h-10 hover:bg-red-400">
                Sign up
              </button>
              <p className="">
                Already registered? <Link to="/login" className="text-blue-600 hover:text-red-400">
                Sign in
              </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;