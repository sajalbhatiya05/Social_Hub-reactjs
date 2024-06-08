import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../Redux/Auth/auth.action";

const intitialValues = { email: "", password: "" };
const validationSchema = {
  email: Yup.string().email("invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "password should be more than 6 character ")
    .required("password is required"),
};
const Login = () => {
  const [formValue, serFromValue] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSummit = (values) => {
    console.log("handle summit", values);
    dispatch(loginUserAction({ data: values }));
  };
  return (
    <>
      <Formik
        onSubmit={handleSummit}
        //validationSchema={validationSchema}
        initialValues={intitialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Form>
      </Formik>
      <div className="flex gap-2 items-center justify-center  pt-5">
        <p>if you don't have account ?</p>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </>
  );
};

export default Login;
