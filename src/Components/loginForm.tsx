import React, { Component, useState } from "react";
// import Joi from "joi-browser";
// import Joi from "joi";
import * as yup from "yup";
import { loginSchema } from "../validations/Login/loginValidations";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { RenderInput } from "./renderInput";
import { RenderButton } from "./renderbutton";
import login, { getCurrentUser } from "../services/authService";
import Joi from "joi";
import { Formik } from "formik";

interface LoginFormProps {
  from: Location;
  
}

const LoginForm: React.FC<LoginFormProps> = (props) => {

  const [data, setData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<any>({});

  const schema: any = yup.object().shape({
    username: yup.string().email().required().min(3).max(20).label("Username"),
    password: yup.string().required().min(3).max(10).label("Password"),
  });

  const doSubmit = async (username:string, password: string) => {
    try {
      await login(username, password);

      const { from } = props as any;

      window.location.href = from ? from.pathname : "/";
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        const errorsObj: any = { ...errors };
        errorsObj.username = ex.response.data;
        setErrors(errors);
      }
    }
    //call the server
    console.log("Submitted");
  };

  const handleSubmit = (e:any) => {
     doSubmit(e.username, e.password);
  };

  if (getCurrentUser()) return <Redirect to="/" />;

  const initialValues = {
    username: "",
    password: ""
  };

  return (
    <Formik
    initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty,
        } = formik;

        return (
          <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <RenderInput
                  name="username"
                  label="Username"
                  value={values.username}
                  onChange={handleChange}
                  error={errors?.username}
                />
                <RenderInput
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  error={errors?.password}
                />
              </div>

              <RenderButton label="LOGIN" />
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
