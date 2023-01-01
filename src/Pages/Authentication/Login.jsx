import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { login as LoginAPI } from "../../Services/AuthService";
import Swal from "sweetalert2";
import Loader from "../../constants/Loader";
import { Button } from "bootstrap";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loader, setloader] = useState(true);
  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();
  const loginSubmit = async (formData) => {
    setBtnLock(true);
    const response = await LoginAPI(formData);
    if (response.data.code === 1) {
      setBtnLock(false);
      localStorage.setItem("FlightXAdmin", JSON.stringify(response.data.data));

      setTimeout(() => {
        navigate("/");
      }, 0);
    }
    if (response.data.code === 0) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
    }
  };
  return (
    <div className="login">
      <div className="login-content">
        <div className="login-img">
          <img src="/assets/images/Logo.png" alt="" />
        </div>
        <div className="login-header">
          <h3>Admin Login</h3>
          <p>Let's get started to Flight X Plan Admin Portal</p>
        </div>
        <form className="form-login" onSubmit={handleSubmit(loginSubmit)}>
          <div className="login-name mb-20">
            <input
              className="inputField"
              type="email"
              placeholder="Your Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="error_validation">Email is required</p>
            )}
          </div>
          <div className="login-name">
            <input
              className="inputField"
              type="password"
              placeholder="Your Password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="error_validation">Password is required</p>
            )}
          </div>
          <button className="login-button" type="submit">
            {btnLock ? (
              <div
                className="loader loader_color"
                style={{ margin: "0 20px" }}
              ></div>
            ) : (
              "Sign in"
            )}
          </button>
          <div className="login-forgot">
            <Link to="#">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
