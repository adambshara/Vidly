import * as yup from 'yup';


export const loginSchema = yup.object().shape({
  username: yup.string().email().required().min(3).max(20).label("Username"),
  password: yup.string().required().min(3).max(10).label("Password"),
  name: yup.string().required().min(3).max(10).label("Name")
});