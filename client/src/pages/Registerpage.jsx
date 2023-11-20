import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();

    // Validation checks
    let isValid = true;

    if (!/^[a-zA-Z]+$/.test(name)) {
      setNameError("Name must contain only alphabets.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      try {
        await axios.post("/register", {
          name,
          email,
          password,
        });
        alert("Registration Successful. Now you can Login");
      } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("Registration Failed. Email already exists.");
        } else {
          alert("Registration Failed. Please try again Later");
        }
        console.log(error);
      }
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(ev) => {
              setName(ev.target.value);
              setNameError("");
            }}
          />
          {nameError && <div className="text-red-500">{nameError}</div>}

          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => {
              setPassword(ev.target.value);
              setPasswordError(""); // Clear the error when input changes
            }}
          />
          {passwordError && <div className="text-red-500">{passwordError}</div>}

          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member{" "}
            <Link className="underline text-black" to="/Login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
