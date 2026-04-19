
function Signup(){
    return(
        <form action="/" className="Signf">
            <input type="text" placeholder='first name' />
            <br />
            <input type="text" placeholder='Last name' />
            <br />
            <input type="text" placeholder='age' />
            <br />
            <input type="email" placeholder='email' />
            <br />
            <input type="text" placeholder='password' />
            <select name="" id=""> <option value="male">male</option>
            <option value="femal">female</option>
            </select>
            
        </form>
    );
}
export default Signup;