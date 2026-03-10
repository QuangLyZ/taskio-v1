import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import LogoM from "../components/LogoM";
import LargeOrangeButton from "../components/LargeOrangeButton";
import LargeWhiteButton from "../components/LargeWhiteButton";

const userValidationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email")
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

export default function ForgotPassword() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmpw: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const res = await fetch(
          `https://693ce425b762a4f15c41b959.mockapi.io/Taskio?email=${values.email}`
        )
        const users = await res.json()

        if (users.length === 0) {
          setFieldError("email", "Email not found")
          return
        }

        const user = users[0]

        await fetch(
          `https://693ce425b762a4f15c41b959.mockapi.io/Taskio/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...user,
              password: values.password,
            }),
          }
        )

        navigate("/")
      } catch (err) {
        console.error(err)
      }
    },
  })

  return (
    <section className="signing-page-body">
      <form onSubmit={formik.handleSubmit} className="signing-card">
        <LogoM />
        <p className="signing-card-title">Reset your password</p>
  
        <div className="signing-input-section">
            <p className="signing-card-label">Email</p>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="signing-error">{formik.errors.email}</p>
            )}
        </div>
  
          <div className="signing-input-section">
            <p className="signing-card-label">Password</p>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="signing-error">{formik.errors.password}</p>
            )}
          </div>
  
          <div className="signing-input-section">
            <p className="signing-card-label">Confirm password</p>
            <input
              type="password"
              name="confirmpw"
              value={formik.values.confirmpw}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmpw && formik.errors.confirmpw && (
              <p className="signing-error">{formik.errors.confirmpw}</p>
            )}
          </div>
  
          <div className="signing-btn">
            <LargeOrangeButton label="Reset password" type="submit" onClick={() => navigate("/")} />
            <LargeWhiteButton
              label="Back"
              type="button"
              onClick={() => navigate("/")}
            />
          </div>
      </form>
    </section>
  )
}