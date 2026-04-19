import Button from '../components/Button'
function Login(){
    return(
        <form action="">
            <input type="email" placeholder="Enter your email" />
            <br />
            <input type="password" placeholder="Enter your password" />
            <br />
            <Button name="Login" type="default" link="/Login.jsx"></Button>
            <p>don't have an account</p>
            <Button name="Sign up" type="secondary" link="/Login.jsx"></Button>
        </form>
  );
}
export default Login
