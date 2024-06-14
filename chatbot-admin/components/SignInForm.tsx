"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { login } from "@/utils/signIn";
import { Label } from "./ui/label";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      setError("root", {
        message: "Invalid email or password",
      });
    }
  };

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="email" className="text-left">
          Email
        </Label>
        <Input
          {...register("email")}
          placeholder="Email"
          id="email"
          type="email"
        />
        {errors.email && (
          <div className="text-left text-xs text-red-500">
            {errors.email.message}
          </div>
        )}
        <Label htmlFor="password" className="text-left">
          Password
        </Label>
        <Input
          {...register("password")}
          placeholder="Password"
          type="password"
          id="password"
        />
        {errors.password && (
          <div className="text-left text-xs text-red-500">
            {errors.password.message}
          </div>
        )}
        <Button disabled={isSubmitting} type="submit" className="mt-4">
          {isSubmitting ? "Loading..." : "Sign in"}
        </Button>
        {errors.root && (
          <div className="text-xs text-red-500">{errors.root.message}</div>
        )}
      </form>
    </>
  );
};

export default SignInForm;
