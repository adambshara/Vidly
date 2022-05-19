import LoginForm from "./loginForm";
import { loginSchema } from "../validations/Login/loginValidations";
import * as userService from "../services/userService";
import { useState } from "react";
import { RenderInput } from "./renderInput";
import { loginWithJwt } from "../services/authService";
import { movieSchema } from "../validations/Movie/movieSchema";
import { Formik } from "formik";
import { RouteComponentProps } from "react-router-dom";

interface RegisterProps {
  from: Location;
  history: RouteComponentProps["history"];
}
interface Input {
  username: string;
  password: string;
  name: string;
  errors: string;
}

const Register: React.FC<RegisterProps> = (props) => {
  const [data, setData] = useState<Input>({
    username: "",
    password: "",
    name: "",
    errors: "",
  });

  const doSubmit = async (e:any) => {
    //call the server
    try {
      const response = await userService.register(e);

      loginWithJwt(response.headers["x-auth-token"]);

      window.location.href = "/";

    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
      }
    }
  };

  const handleSubmit = (e: any) => {
    console.log("bezz",e);
    doSubmit(e);
  };

  const renderButton = (label: string) => {
    return <button className="btn btn-primary">{label}</button>;
  };

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        const {
          values, //internal state
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
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <RenderInput
                  name="username"
                  label="Username"
                  value={values?.username}
                  onChange={handleChange}
                  error={errors?.username}
                  type="string"
                />
                <RenderInput
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  error={errors?.password}
                />
                <RenderInput
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors?.name}
                  type="string"
                />
              </div>

              {renderButton("Save")}
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Register;
