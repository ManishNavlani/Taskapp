import useInput from "../hooks/use-input";
import { useDispatch } from "react-redux";
import { currentUser } from "../Store/action-creator/user-actions";
import { useRegisterMutation } from "../Store/ApiCalls/api-calls";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    reset: resetPasswordInput,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !enteredNameIsValid ||
      !enteredEmailIsValid ||
      !enteredPasswordIsValid
    ) {
      return;
    }

    const body = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const credentials = await register(body).unwrap();

      dispatch(currentUser(credentials));
      resetNameInput();
      resetEmailInput();
      resetPasswordInput();
      setRegisterError(null);
      navigate("/false", { replace: true });
    } catch (err) {
      if (err.status === 400) {
        setRegisterError("email already used");
      }
    }
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="../../src/favicon.svg"
              alt="Task App"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign Up To Your Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={formSubmitHandler}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="text"
                  required
                  autoFocus
                  value={enteredName}
                  onChange={nameChangedHandler}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    nameInputHasError ? `border-red-500` : `border-gray-300`
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 ${
                    nameInputHasError
                      ? `focus:border-red-500`
                      : `focus:border-indigo-500`
                  } focus:z-10 sm:text-sm`}
                  onBlur={nameBlurHandler}
                  placeholder="Name"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  value={enteredEmail}
                  onChange={emailChangedHandler}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    emailInputHasError ? `border-red-500` : `border-gray-300`
                  }   placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 ${
                    emailInputHasError
                      ? `focus:border-red-500`
                      : `focus:border-indigo-500`
                  } focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                  onBlur={emailBlurHandler}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  value={enteredPassword}
                  onChange={passwordChangedHandler}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    passwordInputHasError ? `border-red-500` : `border-gray-300`
                  } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 ${
                    passwordInputHasError
                      ? `focus:border-red-500`
                      : `focus:border-indigo-500`
                  } focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  onBlur={passwordBlurHandler}
                />
              </div>
              <p className="text-red-500">{registerError}</p>
              <Link to="/login">Already have an account? Login.</Link>
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer
                group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
