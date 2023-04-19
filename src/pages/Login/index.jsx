import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import HecLogo from "../../assets/heclogo.png";
import "./style.css";
import style from "./style";

import { useUserStore } from "../../stores/useUserStore";

export default function Login() {
  const [email, password, setEmail, setPassword, loggedIn] = useUserStore(
    (state) => [
      state.email,
      state.password,
      state.setEmail,
      state.setPassword,
      state.loggedIn,
    ]
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    loggedIn();
  };
  return (
    <div className="login-container">
      <Box sx={style.boxContainer}>
        <img alt="#" src={HecLogo} width="140px" />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </div>
  );
}
