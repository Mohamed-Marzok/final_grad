import { useRef, useState } from "react";
import validation from '../utils/formValidation';

const Login = () =>{
    const [message, setMessage] = useState(null); 
    const [signUp , setSignUp] = useState(false);
    const email = useRef(null);
    const password = useRef(null);

    const handleLogIn = (event) => {
        event.preventDefault();
        setMessage(validation(email.current.value , password.current.value));
        if(message) return;
        // Handle login logic here
    }
        
    const toggleForm = () => {
        setSignUp(!signUp);
    }

    return(
        <>
            <div className="fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form className="bg-white rounded-lg shadow-md p-8 w-[600px] w-full" onSubmit={handleLogIn}>
                    <div className="flex flex-col space-y-4">
                        {signUp && (
                            <>
                                <input type="text" placeholder="First Name" className="border border-gray-300 rounded-lg px-4 py-2" name="firstname"  required/>
                                <input type="text" placeholder="Last Name" className="border border-gray-300 rounded-lg px-4 py-2" name="lastname" required/>
                            </>
                        )}
                        {signUp && <input type="text" placeholder="User Name" className="border border-gray-300 rounded-lg px-4 py-2" name="username" required/>}
                        <input type="email" name="email" placeholder="Email" className="border border-gray-300 rounded-lg px-4 py-2" ref={email} required/>
                        <input type="password" name="password" className="border border-gray-300 rounded-lg px-4 py-2" placeholder="Password" ref={password} required/>
                        {signUp && <input type="password" name="confirmpassword" className="border border-gray-300 rounded-lg px-4 py-2" placeholder="Confirm Password" required/>}
                        {signUp && (
                            <select name="user-type" className="border border-gray-300 rounded-lg px-4 py-2" required >
                                <option value="admin">Instructor</option>
                                <option value="assistant">Assistant</option>
                                <option value="student">Student</option>
                            </select>
                        )}
                        <p className="text-red-500">{message}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">{signUp ? "Sign Up" : "Sign In"}</button>
                        <p className="text-gray-500 text-sm text-center">
                            {signUp ? (
                                <>Already Have An Account? <span onClick={toggleForm} className="text-blue-500 cursor-pointer">Sign In</span></>
                            ) : (
                                <>New User? <span onClick={toggleForm} className="text-blue-500 cursor-pointer">Sign Up Now.</span></>
                            )}
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
