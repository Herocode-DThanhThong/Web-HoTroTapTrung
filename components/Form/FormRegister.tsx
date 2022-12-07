import { useUser, useRoom } from "@/hooks/index";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FormEvent, useState } from "react";
const FormRegister = () => {
  const { signup } = useUser();

  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (
      !user.displayName ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      return alert("Please enter enough information");
    }

    if (user.confirmPassword !== user.password) {
      return alert("Confirm password incorrect");
    }

    signup(user.displayName, user.email, user.password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        onChange={handleInputChange}
        label="DisplayName"
        size="small"
        name="displayName"
        variant="standard"
      />
      <TextField
        fullWidth
        onChange={handleInputChange}
        label="Email"
        size="small"
        name="email"
        sx={{
          mt: 2,
        }}
        variant="standard"
      />
      <TextField
        autoComplete="on"
        fullWidth
        onChange={handleInputChange}
        label="Password"
        size="small"
        name="password"
        sx={{
          mt: 2,
        }}
        variant="standard"
        type="password"
      />

      <TextField
        fullWidth
        autoComplete="on"
        onChange={handleInputChange}
        label="Confirm Password"
        size="small"
        name="confirmPassword"
        sx={{
          mt: 2,
        }}
        variant="standard"
        type="password"
      />

      <Button
        type="submit"
        sx={{
          backgroundColor: "#3f50b5 !important",
        }}
        className="w-full mt-4"
        variant="contained"
      >
        <p className="text-center">Sign Up</p>
      </Button>
    </form>
  );
};

export default FormRegister;
