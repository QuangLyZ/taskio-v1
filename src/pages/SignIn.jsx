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
      .required("Password is required"),
  })

  export default function SignIn () {
    const navigate = useNavigate ();
    const formik = useFormik ({
      initialValues: {
        email:"",
        password: "",
      },
      validationSchema: userValidationSchema,
      onSubmit: async (values, {setFieldError}) => {
        try {
          const res = await fetch (`https://693ce425b762a4f15c41b959.mockapi.io/Taskio?email=${values.email}`);
          const users = await res.json();

          if (users.length === 0)
          {
            setFieldError("email", "Email not found");
            return;
          }
          const user = users[0];

          if (user.password !== values.password)
          {
            setFieldError("password", "Wrong password");
            return;
          }

          //Login success 
          localStorage.setItem("user",JSON.stringify(user));
          navigate("/dashboard");
        } catch (err) {
          console.error(err);
        }
    }
  });
    return (
      <section className="signing-page-body">
        <form onSubmit={formik.handleSubmit} className="signing-card">
          <LogoM />
          <p className="signing-card-title">Sign in with email</p>
          <div className="signing-input-section">
              <p className="signing-card-label">Email</p>
              <input 
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
          </div>
          {formik.touched.email && formik.errors.email && <p className="signing-error">{formik.errors.email}</p>}
          <div className="signing-input-section">
            <p className="signing-card-label">Password</p>
            <input 
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.password && formik.errors.password && <p className="signing-error">{formik.errors.password}</p>}
         <div className="signing-btn">
          <p onClick={() => navigate("/resetpassword")} style={{
            color:'#777777',
            fontFamily: 'Helvetica',
            fontSize: '2rem',
            fontWeight: '400',
            textAlign: 'right',
            alignItems: 'right',
            cursor: 'pointer',
          }}>Forgot password?</p>
            <LargeOrangeButton label="Sign In" type="submit" />
            <LargeWhiteButton label="Sign up" onClick={() => navigate("/signup")} />
         </div> 
         </form>
      </section>
    )
  };
