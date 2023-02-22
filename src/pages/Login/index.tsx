import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useForm } from "react-hook-form";
import { loginAsync, selectUser } from "../../app/slices/user";
import { AppButton } from "../../components";
import scss from "./Login.module.scss";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Link } from "react-router-dom";

export type loginDataType = {
  login: string,
  password: string
}

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { status, error } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isValid, dirtyFields }
  } = useForm<loginDataType>({
    mode: "onChange",
    defaultValues: { login: "", password: "" },
  });

  const onSubmit: SubmitHandler<loginDataType> = values => {
    dispatch(loginAsync(values));
  }  

  return (
    <div className={scss.login}>
      <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
        <h1>FInstagram</h1>
        <div>
          <input
            {...register("login", {
              required: true,
              validate: (value) =>
                /^[a-z0-9]+([a-z0-9]*|[._-]?[a-z0-9]+)*$/.test(value) ||
                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value),
              minLength: 2,
            })}
            type="text"
            placeholder="Username or email"
          />
        </div>
        <div>
          <input
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          {dirtyFields.password && (
            <span onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          )}
        </div>
        <AppButton disabled={!isValid || status === "loading"} type="submit">
          Log in
        </AppButton>
        {error && (
          <p>{error}</p>
        )}
        <Link to="/auth/reset">Forgot password?</Link>
      </form>
      <div className={scss.toReg}>
        <p>
          Don't have an account? <Link to="/auth/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
