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

const UserSignupSchema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .max(50, "must be less than 50 characters")
      .required("must provide first name"),
    lastName: yup
      .string()
      .max(50, "must be less than 50 characters")
      .required("must provide last name"),
    middleName: yup
      .string()
      .max(50, "must be less than 50 characters")
      .optional(),
    email: yup
      .string()
      .email("must provide a valid email")
      .required("must provide email"),
    password: yup.string().required("must provide password"),
    confirmationPassword: yup
      .string()
      .required("must confirm password")
      .oneOf([yup.ref("password"), null], "passwords must match"),
  })
  .required();

export const useUserSignupForm = () => {
  const form = useForm({
    resolver: yupResolver(UserSignupSchema),
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
    FirstName: () =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                errorMessage={fieldState.error?.message}
                label="First Name"
              />
            )}
          />
        ),
        []
      ),
    LastName: () =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                errorMessage={fieldState.error?.message}
                label="Last Name"
              />
            )}
          />
        ),
        []
      ),
    MiddleName: () =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="middleName"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                errorMessage={fieldState.error?.message}
                label="Middle Name"
              />
            )}
          />
        ),
        []
      ),
    Email: () =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                errorMessage={fieldState.error?.message}
                label="Email"
                type="email"
              />
            )}
          />
        ),
        []
      ),
    Password: () =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                errorMessage={fieldState.error?.message}
                label="Password"
                type="password"
              />
            )}
          />
        ),
        []
      ),
    ConfirmationPassword: () =>
      React.useMemo(
        () => (
          <Controller
            control={control}
            name="confirmationPassword"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                errorMessage={fieldState.error?.message}
                label="Confirmation Password"
                type="password"
              />
            )}
          />
        ),
        []
      ),
  };

  return { ...form, FormComponents };
};
