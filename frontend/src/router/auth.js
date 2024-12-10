import LoginForm from "@/components/auth/Login.vue"
import SignUpForm from "@/components/auth/SignUp.vue"
export default [
  {
    path: "login",
    component: LoginForm,
    name: "LoginPage",
  },
  {
    path: "signup",
    component: SignUpForm,
    name: "SignUpPage",
  },
]
