import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import HecLogo from "../../assets/heclogo.png";
import "./style.css";
import "../../utils/utils.css";
import style from "./style";
import { useUserStore } from "../../stores/useUserStore";
import regex from "../../constant/regex";
import { loginUser } from "../../asyncActions/AuthActions";
import { useBackdropStore } from "../../stores/useBackdropStore";
import { useSnackBarStore } from "../../stores/useSnackBarStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [email, password, setEmail, setPassword, setUserData] = useUserStore(
    (state) => [
      state.email,
      state.password,
      state.setEmail,
      state.setPassword,
      state.setUserData,
    ]
  );

  const [setBackdrop] = useBackdropStore((state) => [state.setBackdrop]);
  const [setOpenSnackbar] = useSnackBarStore((state) => [
    state.setOpenSnackbar,
  ]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setBackdrop(true);
      const data = {
        email: email,
        password: password,
      };
      const response = await loginUser(data);
      if (response.data.success) {
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        setUserData(response.data.data);
        setBackdrop(false);
        navigate("/");
        setOpenSnackbar({
          openSnackbar: true,
          type: "success",
          message: response.data.message,
        });
      }
    } catch (error) {
      setBackdrop(false);
      setOpenSnackbar({
        openSnackbar: true,
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  const handleDisable = () => {
    return !regex.email.test(email) || password.length < 6;
  };

  return (
    <div className="login-container bg-light">
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
            error={email !== "" && !regex.email.test(email)}
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
            error={password !== "" && password.length < 6}
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
            disabled={handleDisable()}
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
