import { useRef, useState } from "react";
import validation from '../utils/formValidation';
import { useLocation, useNavigate } from "react-router";
import { login_API, register_API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser,removeUser } from "../redux/userSlice";
const Login = () =>{
    const [message, setMessage] = useState(null); 
    const [isLogin, setIsLogin] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const firstName = useRef(null);
    const lastName = useRef(null);
    const userName = useRef(null);
    const confirmPassword = useRef(null);
    const userType = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isLogin) {
            setMessage(validation(email.current.value , password.current.value));
            if(message) return;

            try {
                const response = await fetch(login_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email.current.value,
                        password: password.current.value
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }

                

                const data = await response.json();
                console.log(data,'user Data');
                console.log(data.result.roles.$values[0] , 'role')
                // console.log(data.roles.$values[0] , 'values');
                dispatch(addUser(data));
                localStorage.setItem('token', data.result.token);
                localStorage.setItem('role', data.result.roles.$values[0]);
                localStorage.setItem('userEmail', data.result.email);
    
                if (data.result.roles.$values[0] === 'Instructor') {
                    navigate('/instructor')
                } else if (data.result.roles.$values[0]  === 'Student') {
                    navigate('/student');
                }
                console.log(data);
            } catch (error) {
                setMessage(error.message);
            }
        } else {
            setMessage(validation(email.current.value , password.current.value));
            if(message) return;

            try {
                const response = await fetch(register_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: firstName.current.value,
                        lastName: lastName.current.value,
                        email: email.current.value,
                        password: password.current.value,
                        userName: userName.current.value,
                        role: userType.current.value
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }

                const data = await response.json();
                toggleForm();
            } catch (error) {
                setMessage(error.message);
            }
        }
    }
    

    return(
        <>
            <div className="fixed top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <form className="bg-white rounded-lg shadow-md p-8 w-[600px] w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4">
                        {!isLogin && (
                            <>
                                <input type="text" placeholder="First Name" className="border border-gray-300 rounded-lg px-4 py-2" name="firstname" ref={firstName} required/>
                                <input type="text" placeholder="Last Name" className="border border-gray-300 rounded-lg px-4 py-2" name="lastname" ref={lastName} required/>
                                <input type="text" placeholder="User Name" className="border border-gray-300 rounded-lg px-4 py-2" name="username" ref={userName} required/>
                                <input type="password" placeholder="Confirm Password" className="border border-gray-300 rounded-lg px-4 py-2" name="confirmpassword" ref={confirmPassword} required/>
                                <select name="role" className="border border-gray-300 rounded-lg px-4 py-2" ref={userType} required >
                                    <option value="instructor">Instructor</option>
                                    <option value="assistant">Assistant</option>
                                    <option value="student">Student</option>
                                </select>
                            </>
                        )}
                        <input type="email" name="email" placeholder="Email" className="border border-gray-300 rounded-lg px-4 py-2" ref={email} required/>
                        <input type="password" name="password" className="border border-gray-300 rounded-lg px-4 py-2" placeholder="Password" ref={password} required/>
                        <p className="text-red-500">{message}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">{isLogin ? "Sign In" : "Sign Up"}</button>
                        <p className="text-gray-500 text-sm text-center">
                            {isLogin ? (
                                <>New User? <span onClick={toggleForm} className="text-blue-500 cursor-pointer">Sign Up Now.</span></>
                            ) : (
                                <>Already Have An Account? <span onClick={toggleForm} className="text-blue-500 cursor-pointer">Sign In</span></>
                            )}
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;