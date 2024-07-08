"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";

export default function SignupPage() {
  const [loadingRegister, setLoadingRegister] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
    setLoadingRegister(true);

    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      window.location.href = "/auth/login";
    } else {
      console.error("Signup failed");
    }

    setLoadingRegister(false);
  };

  return (
    <div className="flex flex-col min-w-[20%] min-h-full justify-center gap-12 items-center p-12 bg-zinc-900 rounded-2xl">
      <h1 className="text-2xl">Crear Cuenta</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSignup}>
        <Input
          id="username"
          label="Username"
          name="username"
          type="text"
          required
        />
        <Input id="email" label="Email" name="email" type="email" required />
        <Input
          id="password"
          label="Password"
          name="password"
          type="password"
          required
        />
        <Button color="success" type="submit">
          {loadingRegister ? (
            <div className="border-4 border-t-transparent border-grey-500 w-4 h-4 rounded-full animate-spin"></div>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </div>
  );
}
