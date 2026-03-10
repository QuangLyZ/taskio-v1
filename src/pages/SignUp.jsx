import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import LogoM from "../components/LogoM";
import LargeOrangeButton from "../components/LargeOrangeButton";
import LargeWhiteButton from "../components/LargeWhiteButton";

const userValidationSchema = yup.object({
  name: yup.string().required("User name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
  confirmpw: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
})

export default function SignUp() {
  const navigate = useNavigate()

  const handleSignUp = async (newUser) => {
    console.log(newUser)
    await fetch(`https://693ce425b762a4f15c41b959.mockapi.io/Taskio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
    navigate("/")
  }

  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpw: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: handleSignUp,
  })

  return (
    <section className="signing-page-body">
      <form onSubmit={handleSubmit} className="signing-card">
        <LogoM />
  
        <p className="signing-card-title">Create new account</p>
  
          <div className="signing-input-section">
            <p className="signing-card-label">User name</p>
            <input name="name" onChange={handleChange} onBlur={handleBlur} />
            {touched.name && errors.name && <p className="signing-error">{errors.name}</p>}
          </div>
  
          <div className="signing-input-section">
            <p className="signing-card-label">Email</p>
            <input name="email" onChange={handleChange} onBlur={handleBlur} />
            {touched.email && errors.email && <p className="signing-error">{errors.email}</p>}
          </div>
  
          <div className="signing-input-section">
            <p className="signing-card-label">Password</p>
            <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} />
            {touched.password && errors.password && <p className="signing-error">{errors.password}</p>}
          </div>
  
          <div className="signing-input-section">
            <p className="signing-card-label">Confirm password</p>
            <input type="password" name="confirmpw" onChange={handleChange} onBlur={handleBlur} />
            {touched.confirmpw && errors.confirmpw && <p className="signing-error">{errors.confirmpw}</p>}
          </div>
  
          <div className="signing-btn">
            <LargeOrangeButton label="Sign up" type="submit" />
            <LargeWhiteButton
              label="Back"
              // type="button"
              onClick={() => navigate("/")}
            />
          </div>
      </form>
    </section>
  )
}