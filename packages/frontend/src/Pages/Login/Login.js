import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.css";
import LogoHead from "../../Components/LogoHead/LogoHead";
import Footer from "../../Components/Footer/Footer";
import { ReactComponent as Eye } from "../../assets/eye.svg";

const Login = () => {
  const history = useHistory();
  const [showPass, setShowPass] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    history.push('/dashboard');
  };
  const showPassword = () => {
    setShowPass(!showPass);
  };

  return (
    <div>
      <div className="loginPage">
        <LogoHead isWhite={true} />
        <div className="loginDiv">
          <div className="loginFormDiv">
            <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
              <h1>LOGIN</h1>
              {/* <div>
                <h3> Choose Entity*</h3>
                <div className="radioGroup">
                  <label>
                    <div className="loginRadio">
                      <input
                        type="radio"
                        value="State"
                        name="entity"
                        ref={register({ required: true })}
                      />
                      <span>State</span>
                    </div>
                  </label>
                  <label>
                    <div className="loginRadio">
                      <input
                        type="radio"
                        value="Centre"
                        name="entity"
                        ref={register({ required: true })}
                      />
                      <span>Centre</span>
                    </div>
                  </label>
                </div>
                {errors.entity && (
                  <span className="fieldError">This field is required</span>
                )}
              </div> */}
              <label className="loginEmail">
                E-mail address*
                <input
                  ref={register({ required: true })}
                  name="email"
                  type="email"
                />
                {errors.email && (
                  <span className="fieldError">This field is required</span>
                )}
              </label>
              <label>
                Password*
                <div className="loginPass">
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
                  <span className="fieldError">This field is required</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className="fieldError">It should contain atleast 6 characters</span>
                )}
              </label>
              {/* <label className="loginDept">
                Select Department*
                <select ref={register({ required: true })} name="department">
                  <option value="">Select</option>
                  <option value="dep1">dep1</option>
                  <option value="dep2">dep2</option>
                  <option value="dep3">dep3</option>
                  <option value="dep4">dep4</option>
                </select>
                {errors.department && (
                  <span className="fieldError">This field is required</span>
                )}
              </label> */}
              <button type="submit" className="loginBtn">
                SUBMIT
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
