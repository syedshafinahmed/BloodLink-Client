import React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import logo from '../../assets/BloodLink.png';
import { Link } from 'react-router';
import { motion } from "framer-motion";

const Login = () => {
  return (
    <motion.div initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
      <div className="flex flex-col gap-3 items-center justify-center">
        <img src={logo} className="w-20" alt="BloodLink Logo" />
        <p className="text-xs text-center">Your impact starts here — Log in</p>
      </div>

      <div className="flex flex-col mt-10">
        <TextField label="Name" color="error" size="small" sx={{ mb: 2 }} />
        <TextField label="Email" color="error" size="small" sx={{ mb: 2 }} />
        <Button variant="outlined" color="error" sx={{ mb: 2 }}>Login</Button>
        <span className="text-sm text-center">Don't have an account?{" "}<Link to="/register" className="text-[#f9232c] font-black">Register</Link>
        </span>
      </div>
    </motion.div>
  );
};

export default Login;
