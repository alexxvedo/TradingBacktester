"use client";

import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";

export default function LoginPage() {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoadingLogin(true);
    setError(null);

    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res.ok) {
      console.log("Client: User authenticated successfully");
      window.location.href = "/sesiones";
    } else {
      console.error("Client: Login failed", res);
      setError(res.error || "Login failed");
    }

    setLoadingLogin(false);
  };

  return (
    <div className="flex flex-col min-w-[20%] min-h-full justify-center gap-12 items-center p-12 bg-zinc-900 rounded-2xl">
      <h1 className="text-2xl">Iniciar Sesión</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <Input id="email" label="Email" name="email" type="email" required />
        <Input
          id="password"
          label="Password"
          name="password"
          type="password"
          required
        />
        <Button color="secondary" type="submit">
          {loadingLogin ? (
            <div className="border-4 border-t-transparent border-grey-500 w-4 h-4 rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
}
