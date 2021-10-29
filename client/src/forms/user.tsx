import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { LoginData } from "../generated/graphql";
import TextField from "../components/Common/TextField";

const UserLoginSchema = yup
  .object()
  .shape({
    email: yup.string().email("Not a valid email").required(),
    password: yup.string().required(),
  })
  .required();

export const useUserLoginForm = () => {
  const form = useForm({
    resolver: yupResolver(UserLoginSchema),
  });

  const { control, handleSubmit } = form;

  const FormComponents = {
    Form: ({
      children,
      submitHandler,
    }: {
      children: React.ReactNode;
      submitHandler: SubmitHandler<LoginData>;
    }) => <form onSubmit={handleSubmit(submitHandler)}>{children}</form>,
    Email: ({ isLoading }: { isLoading?: boolean }) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => {
              console.log(fieldState);
              console.log(field);
              return (
                <TextField
                  {...field}
                  label="Email"
                  errorMessage={fieldState.error?.message}
                  isDisabled={isLoading}
                />
              );
            }}
          />
        ),
        [isLoading]
      ),
    Password: ({ isLoading }: { isLoading?: boolean }) =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                errorMessage={fieldState.error?.message}
                isDisabled={isLoading}
              />
            )}
          />
        ),
        [isLoading]
      ),
  };

  return {
    FormComponents,
    ...form,
  };
};
