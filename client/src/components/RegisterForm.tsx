import React, { useState } from "react";
import { API_URL } from "../shared/contants";
function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    const endpoint = API_URL + "/users/create";
    const requestBody = {
      name: name,
      email: email,
    };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const content = await response.json();

    console.log(content)

  };
  return (
    <form action="">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <button onClick={handleSubmit} type="button">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
