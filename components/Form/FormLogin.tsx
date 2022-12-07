import React, { ChangeEvent, FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useUser } from "@/hooks/index";
const FormLogin = () => {
  const { loginWithEmailPassword } = useUser();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validate
    if (!user.email || !user.password) {
      return alert("Please enter enough information");
    }

    loginWithEmailPassword(user.email, user.password);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        onChange={handleInputChange}
        label="Email"
        name="email"
        size="small"
        variant="standard"
      />
      <TextField
        fullWidth
        onChange={handleInputChange}
        label="Password"
        name="password"
        size="small"
        type="password"
        autoComplete="on"
        sx={{
          mt: 2,
        }}
        variant="standard"
      />

      <Button
        type="submit"
        sx={{
          backgroundColor: "#3f50b5 !important",
        }}
        className="w-full  mt-4"
        variant="contained"
      >
        <p className="text-center">Sign In</p>
      </Button>
    </form>
  );
};

export default FormLogin;
