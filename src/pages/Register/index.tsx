import { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerAsync, selectUser } from "../../app/slices/user";
import appAxios from "../../appAxios";
import { AppButton } from "../../components";
import { CheckIcon, XIcon } from "../../components/icons";
import scss from "./Register.module.scss";

export type registerDataType = {
  email: string;
  username: string;
  fullname: string;
  password: string;
};

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { status } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields, dirtyFields },
    setError
  } = useForm<registerDataType>({
    mode: "onChange",
    defaultValues: { fullname: "", password: "", email: "" },
  });

  const onSubmit: SubmitHandler<registerDataType> = values => {
    dispatch(registerAsync(values));
  }  

  const checkIsFree = async (evt: React.FocusEvent<HTMLInputElement>, field: "email" | "username") => {
    try {
      if (dirtyFields[field] && !errors[field]) {
        const {data} = await appAxios.post<{isFree: boolean}>("/auth/check", {[field]: evt.target.value});
        if (!data.isFree) {
          setError(field, { type: "custom", message: `${field} is already using` })
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={scss.register}>
      <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
        <h1>FInstagram</h1>
        <h5>Sign up to see photos and videos from your friends.</h5>
        <div>
          <input
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email",
              },
              onBlur: (e) => checkIsFree(e, "email"),
            })}
            type="text"
            placeholder="Email"
          />
          {touchedFields.email &&
            (errors.email ? (
              <div title={errors.email.message}>
                <XIcon />
              </div>
            ) : (
              <CheckIcon />
            ))}
        </div>
        <div>
          <input
            {...register("fullname", {
              pattern: {
                value:
                  /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
                message: "Invalid full name",
              },
            })}
            type="text"
            placeholder="Full Name"
          />
          {touchedFields.fullname &&
            dirtyFields.fullname &&
            (errors.fullname ? (
              <div title={errors.fullname.message}>
                <XIcon />
              </div>
            ) : (
              <CheckIcon />
            ))}
        </div>
        <div>
          <input
            {...register("username", {
              required: true,
              pattern: {
                value: /^[a-z0-9]+([a-z0-9]*|[._-]?[a-z0-9]+)*$/,
                message:
                  "Can start and finish with small letter, includes numbers, small letters and symbols('.', '_', '-')",
              },
              minLength: {
                value: 2,
                message: "Minimum two characters",
              },
              onBlur: (e) => checkIsFree(e, "username"),
            })}
            type="text"
            placeholder="Username"
          />
          {touchedFields.username &&
            (errors.username ? (
              <div title={errors.username.message}>
                <XIcon />
              </div>
            ) : (
              <CheckIcon />
            ))}
        </div>
        <div>
          <input
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Minimum eight characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                message:
                  "At least one uppercase letter, one lowercase letter, one number and one special character",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          {touchedFields.password &&
            (errors.password ? (
              <div title={errors.password.message}>
                <XIcon />
              </div>
            ) : (
              <CheckIcon />
            ))}
          {dirtyFields.password && (
            <span onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          )}
        </div>
        <p>
          People who use our service may have uploaded your contact information
          to Instagram. <a href="/">Learn More</a>
        </p>
        <p>
          By signing up, you agree to our <a href="/">Terms</a> ,{" "}
          <a href="/">Privacy Policy</a> and <a href="/">Cookies Policy</a> .
        </p>
        <AppButton
          disabled={Boolean(
            !isValid ||
              status === "loading" ||
              errors.email ||
              errors.username
          )}
          type="submit"
        >
          Sign up
        </AppButton>
      </form>
      <div className={scss.toLogin}>
        <p>
          Have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
};
