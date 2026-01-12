import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import logo from '../../assets/BloodLink.png';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import Loading from '../../loading/Loading';

const Login = () => {
  const { signInUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    setLoginError("");
    setLoading(true);
    signInUser(data.email, data.password)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false
        });
        navigate(location?.state || '/');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setLoginError("Incorrect email or password");
      });
  };

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className='p-10'>
      <motion.div initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <div className="flex flex-col gap-3 items-center justify-center">
          <img src={logo} className="w-30" alt="BloodLink Logo" />
          <p className="text-sm text-center">Your impact starts here — <strong>Log in</strong></p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col mt-10 w-full max-w-md mx-auto">
          {/* Email Field */}
          <TextField
            label="Email"
            color="error"
            size="small"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            sx={{
              mb: 2,
              input: {
                color: 'text.primary', // adapts to dark/light
              },
              label: {
                color: 'text.secondary',
              },
              '.MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#f9232c',
                },
                '&:hover fieldset': {
                  borderColor: '#f9232c',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#f9232c',
                },
              },
            }}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            color="error"
            size="small"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            sx={{
              mb: 1,
              input: {
                color: 'text.primary',
              },
              label: {
                color: 'text.secondary',
              },
              '.MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#f9232c',
                },
                '&:hover fieldset': {
                  borderColor: '#f9232c',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#f9232c',
                },
              },
            }}
          />

          {/* Login Error */}
          {loginError && (
            <p className="text-[#f9232c] text-xs mb-2">{loginError}</p>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            variant="outlined"
            color="error"
            sx={{
              mb: 2,
              mt: 2,
              borderColor: '#f9232c',
              color: '#f9232c',
              '&:hover': {
                backgroundColor: 'rgba(249,35,44,0.1)',
                borderColor: '#f9232c',
              },
            }}
          >
            Login
          </Button>

          {/* Register Link */}
          <span className="text-sm text-center text-base-content">
            Don't have an account?{" "}
            <Link
              state={location.state}
              to="/register"
              className="text-[#f9232c] font-black"
            >
              Register
            </Link>
          </span>
        </form>

      </motion.div>
    </div>
  );
};

export default Login;






