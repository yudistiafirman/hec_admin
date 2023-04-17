import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Alert,
} from "@mui/material";
import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { apiUrl } from "../../Default";
import Swal from "sweetalert2";

const UserMenuDialog = ({ open, onClose, title }) => {
  const [emailValue, SetEmailValue] = useState("");
  const [passwordValue, SetPasswordValue] = useState("");
  const [errorEmail, SetErrorEmail] = useState({
    boolEmail: false,
    errorEmailMsg: "",
  });
  const [errorPassword, SetErrorPassword] = useState({
    boolPassword: false,
    errorPasswordMsg: "",
  });
  const [failedLogin, SetFailedLogin] = useState(false);
  const [failedLoginMsg, SetFailedLoginMsg] = useState("");
  const { boolEmail, errorEmailMsg } = errorEmail;
  const { boolPassword, errorPasswordMsg } = errorPassword;

  const onContinue = () => {
    title === "add" ? onRegisterUser() : onUpdatePassword();
  };

  useEffect(() => {
    SetFailedLogin(false);
    SetFailedLoginMsg("");
  }, [open]);
  const onRegisterUser = () => {
    if (emailValue && passwordValue && !boolEmail && !boolPassword) {
      axios
        .post(apiUrl + "/auth/register", {
          email: emailValue,
          password: passwordValue,
        })
        .then((res) => {
          if (res.data.success) {
            onClose();
            Swal.fire({
              icon: "success",
              title: "Penambahan admin baru berhasil",
            });
            SetEmailValue("");
            SetPasswordValue("");
            SetFailedLogin(false);
            SetFailedLogin("");
          } else {
            SetFailedLogin(true);
            SetFailedLoginMsg(res.data.message);
          }
        });
    }
  };

  const onUpdatePassword = () => {
    if (emailValue && passwordValue && !boolEmail && !boolPassword) {
      axios
        .post(apiUrl + "/auth/update", {
          email: emailValue,
          password: passwordValue,
        })
        .then((res) => {
          if (res.data.success) {
            onClose();
            Swal.fire({
              icon: "success",
              title: "pergantian password berhasil",
            });
            SetEmailValue("");
            SetPasswordValue("");
            SetFailedLogin(false);
            SetFailedLogin("");
          } else {
            SetFailedLogin(true);
            SetFailedLoginMsg(res.data.message);
          }
        });
    }
  };
  const onChangeEmail = useCallback(
    (e) => {
      const re = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
      if (re.test(e.target.value)) {
        SetErrorEmail({ boolEmail: false, errorEmailMsg: "" });
        SetEmailValue(e.target.value);
      } else {
        SetErrorEmail({ boolEmail: true, errorEmailMsg: "Format email salah" });
        SetEmailValue(e.target.value);
      }
    },
    [emailValue, boolEmail, errorEmailMsg]
  );

  const onChangePassword = useCallback(
    (e) => {
      const rePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      if (!rePassword.test(e.target.value)) {
        SetErrorPassword({
          boolPassword: true,
          errorPasswordMsg:
            "Password harus terdiri paling sedikit 1 huruf besar 1 huruf kecil, dan satu nomor",
        });
        SetPasswordValue(e.target.value);
      } else {
        SetErrorPassword({ boolPassword: false, errorPasswordMsg: "" });
        SetPasswordValue(e.target.value);
      }
    },
    [passwordValue, boolPassword, errorPasswordMsg]
  );
  return (
    <Dialog open={open} onClose={onClose}>
      {failedLogin && <Alert severity="error">{failedLoginMsg}</Alert>}

      <DialogTitle>
        Admin {title === "add" ? "Add User" : "Change Password"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your email address and password here
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={emailValue}
          error={boolEmail}
          onChange={onChangeEmail}
        />
        <DialogContentText fontSize="12px" color="red">
          {errorEmailMsg}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={passwordValue}
          error={boolPassword}
          onChange={onChangePassword}
        />
        <DialogContentText fontSize="12px" color="red">
          {errorPasswordMsg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onContinue}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserMenuDialog;
