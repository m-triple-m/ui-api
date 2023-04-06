import { Box, Grid, Typography, Link } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SubmitButton } from "./common/Button";
import FormImg from "./../assets/FormImg-removebg.png";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BottomLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2.5rem;
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signin = () => {
  const url = 'http://localhost:5000';
  const navigate = useNavigate();
  return (
    <Box>
      <Grid
        container
        sx={{
          maxWidth: { xs: "100vw", md: "100vw" },
          height: { xs: "auto", md: "100vh" },
          paddingTop: { xs: "2rem", sm: "2rem" },
          paddingBottom: { xs: "2rem", sm: "2rem" },
          background: "#0f212ebe",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            background: `#0f212e url(${FormImg}) center`,
            height: { xs: "70vh", md: "70vh" },
            maxWidth: { xs: "80vw", md: "70vh" },
            borderRadius: { xs: "1rem 1rem 0 0", md: "1rem 0 0 1rem" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundSize: "cover",
          }}
        />

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            height: { xs: "70vh", md: "70vh" },
            maxWidth: { xs: "80vw", md: "70vh" },
            background: "#fff",
            borderRadius: { xs: "0 0 1rem 1rem", md: "0 1rem 1rem 0" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: { xs: "1rem", md: "2rem" },
            paddingRight: { xs: "2rem", md: "2rem" },
            textAlign: "center",
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async(formdata, { setSubmitting }) => {
              // make an API call to login the user
              setSubmitting(false);
              const res = await fetch(url+'/user/auth', {
                method: 'POST',
                body : JSON.stringify(formdata),
                headers: {
                  'Content-Type' : 'application/json'
                }
              })
          
              console.log(res.status);
              if(res.status===201){
                const userdata = (await res.json()).result;
                //success alert
                Swal.fire(
                  'Hurray!',
                  'Login Successful',
                  'success'
                )
                console.log(userdata);
                navigate("/");
                
                
              }else{
                // fail alert
                Swal.fire(
                  'Oops...',
                  'Login Unsuccessful',
                  'error'
                )
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Typography
                  variant="h4"
                  component="h1"
                  color="#23235e"
                  gutterBottom
                  sx={{
                    marginBottom: "1rem",
                  }}
                >
                  Sign In
                </Typography>
                <div className="form-control" sx={{ mb: "1rem" }}>
                  <label htmlFor="email">
                    Email address<span className="req">*</span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="email-field"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-control" sx={{ mb: "1rem" }}>
                  <label htmlFor="password">
                    Password<span className="req">*</span>
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="password-field"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <SubmitButton
                  disabled={isSubmitting}
                  sx={{ width: "100%", marginTop: "2rem" }}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </SubmitButton>
              </Form>
            )}
          </Formik>
          <BottomLinks sx={{ maxWidth: { xs: "80vw", md: "70vh" } }}>
            <Link
              href="#"
              color="#8d8d8da4"
              underline="none"
              sx={{ mr: "1rem" }}
            >
              Forgot Password?
            </Link>
            <LinkGroup>
              <Link
                href="#"
                color="#8d8d8da4"
                underline="none"
                sx={{ mr: "0.5rem" }}
              >
                Contact us
              </Link>
              <Link
                href="#"
                color="#8d8d8da4"
                underline="none"
                sx={{ mr: "0.5rem" }}
              >
                Terms
              </Link>
              <Link href="#" color="#8d8d8da4" underline="none">
                Policy
              </Link>
            </LinkGroup>
          </BottomLinks>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signin;
