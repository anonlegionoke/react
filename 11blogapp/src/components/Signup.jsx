import authService from "../appwrite/auth" //since its a signup
import {Link, useNavigate} from "react-router-dom" //need to navigate user to pages
import React, {useState} from 'react' 
import Button from "./Button"
import Input from './Input'
import Logo from "./Logo"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {login} from "../store/authSlice"

function Signup() {
/* Now lets call all the functions needed like useNavigate() to navigate
useDispatch to dispatch, to register the user useForm() etc. */

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    
    /* Now we create the user
    
    we always use  trycatch in these situations, for, what if
    some error happened and couldn't register user*/

    const create = async (data /* the data user entering */) => {
        setError("" /* initialising with an empty string */)
        try {
            console.log(data);
            const userData = await authService.createAccount(data) /* creating account using entered data */
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login({userData})) /* if user exits dispatch login action */
                navigate("/") /* send the user to home */
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            {...register("name", { required: true })}
                            label="Full Name : "
                            placeholder="Full Name"
                        />
                        <Input
                            {...register("email", {
                                required: true,
                                
                            })}
                            label="Email : "
                            placeholder="Email Address"
                            type="email"
                        />
                        <Input
                            {...register("password", { required: true })}
                            label="Password : "
                            type="password"
                            placeholder="Password"
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup