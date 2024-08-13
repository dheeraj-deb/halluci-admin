"use client";
import { Box, Button, Container, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import sx from "./page.module.scss";
import { useFormik } from "formik";
import { notifications } from "@mantine/notifications";
import {
  ServerError,
  ServerParseError,
  useMutation,
  ApolloError,
} from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import { useRouter } from "next/navigation";
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

interface FormValues {
  username: string;
  password: string;
}
const Page = () => {
  const nav = useRouter();
  const [show, setShow] = useState(false);
  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await adminLogin({
          variables: {
            username: values.username,
            password: values.password,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  const [adminLogin, { error, loading }] = useMutation(LOGIN, {
    onError({ networkError: { result } }) {
      if (result?.errors[0].extensions.http.status === 404) {
        formik.setFieldError("username", result?.errors[0].message);
      } else if (result?.errors[0].extensions.http.status === 401) {
        formik.setFieldError("password", result?.errors[0].message);
      } else {
        notifications.show({
          title: "Something went wrong",
          message: result?.errors[0].message,
        });
      }
    },
    onCompleted({ loginAdmin }) {
      if (loginAdmin.status == 200) {
        notifications.show({
          color: "green",
          title: "Success",
          message: loginAdmin.message,
        });
        nav.push("/dashboard");
      }
    },
  });

  return (
    <Container p={"md"} fluid classNames={{ root: sx.container }}>
      <form action="" onSubmit={formik.handleSubmit} className={sx.form}>
        <TextInput
          error={formik.touched.username && formik.errors.username}
          onChange={formik.handleChange}
          value={formik.values.username}
          name="username"
          label="Username"
          placeholder="Enter your username"
        />
        <TextInput
          error={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          value={formik.values.password}
          name="password"
          type={show ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          rightSection={
            show ? (
              <EyeClosedIcon
                style={{ cursor: "pointer" }}
                onClick={() => setShow((i) => !i)}
              />
            ) : (
              <EyeOpenIcon
                style={{ cursor: "pointer" }}
                onClick={() => setShow((i) => !i)}
              />
            )
          }
        />
        <Button loading={loading} type="submit">
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Page;
