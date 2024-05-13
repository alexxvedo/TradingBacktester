import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-w-[20%] min-h-full justify-center gap-12 items-center p-12 bg-zinc-900 rounded-2xl">
      <h1 className="text-2xl">Iniciar Sesion</h1>
      <form className="flex flex-col gap-4 ">
        <Input id="email" label="Email" name="email" type="email" required />
        <Input
          id="password"
          label="Password"
          name="password"
          type="password"
          required
        />
        <Button color="secondary" type="submit" formAction={login}>
          Log in
        </Button>
        <Button color="success" type="submit" formAction={signup}>
          Sign up
        </Button>
      </form>
    </div>
  );
}
