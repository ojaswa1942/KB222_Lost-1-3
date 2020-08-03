import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import styles from "./Login.module.css";
import LogoHead from "../../Components/LogoHead/LogoHead";
import Footer from "../../Components/Footer/Footer";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as Loader } from "../../assets/three-dots.svg";
import getToast from "../../utils/getToast";
import LOGIN from "../../graphql/mutations/login";

const Login = () => {
  const history = useHistory();
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [runLogin, { loading }] = useMutation(LOGIN, {
    onCompleted: () => {
      history.push("/dashboard");
    },
    onError: (error) => {
      const toast = getToast();
      if (error.graphQLErrors.length > 0) {
        toast.fire({
          title: error.graphQLErrors[0].message,
          icon: "error",
        });
      } else {
        toast.fire({
          title: "Some error occurred",
          icon: "error",
        });
      }
    },
  });

  const onSubmit = (data) => {
    runLogin({
      variables: {
        input: data,
      },
    });
  };
  const showPassword = () => {
    setShowPass(!showPass);
  };

  return (
    <div>
      <div className={styles.loginPage}>
        <LogoHead isWhite />
        <div className={styles.loginDiv}>
          <div className={styles.loginFormDiv}>
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
              <h1>LOGIN</h1>
              <label htmlFor="email" className={styles.loginEmail}>
                E-mail address*
                <input ref={register({ required: true })} name="email" type="email" />
                {errors.email && <span className={styles.fieldError}>This field is required</span>}
              </label>
              <label htmlFor="password">
                Password*
                <div className={styles.loginPass}>
                  <input
                    ref={register({ required: true, minLength: 6 })}
                    name="password"
                    type={showPass ? "text" : "password"}
                  />
                  <button onClick={showPassword} type="button">
                    <Eye />
                  </button>
                </div>
                {errors.password && errors.password.type === "required" && (
                  <span className={styles.fieldError}>This field is required</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className={styles.fieldError}>It should contain atleast 6 characters</span>
                )}
              </label>
              {/* <label className={styles.loginDept}>
                Select Department*
                <select ref={register({ required: true })} name="department">
                  <option value="">Select</option>
                  <option value="dep1">dep1</option>
                  <option value="dep2">dep2</option>
                  <option value="dep3">dep3</option>
                  <option value="dep4">dep4</option>
                </select>
                {errors.department && (
                  <span className={styles.fieldError}>This field is required</span>
                )}
              </label> */}
              <button type="submit" className={styles.loginBtn} disabled={loading}>
                {!loading ? `SUBMIT` : <Loader height="1em" />}
              </button>
              <a href="/login">Forgot Password ? Contact admin</a>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
