import { useRef } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const navigate = useNavigate()

    const register = async () => {
        const name = nameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const passwordConfirmation = passwordConfirmationRef.current.value
        const response = await fetch(`${process.env.REACT_APP_API}/users/register`, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        
        if (json.success) {
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } else {
            window.alert(json.messages[0])
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <div className="Register_register__csfwh my-5 p-5">
                        <div className="mb-4">
                            <img width={100} src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg" alt=""/>
                        </div>
                        <h1 className="mb-4">Create Account</h1>
                        <div className="form-field mb-3">
                            <label htmlFor='name' className='mb-2'>Name</label>
                            <input ref={nameRef} type='text' id='name' className='form-control mb-3' />
                        </div>
                        <div className="form-field mb-3">
                            <label htmlFor='email' className='mb-2'>Email Address</label>
                            <input ref={emailRef} type='email' id='email' className='form-control mb-3' />
                        </div>
                        <div className="form-field mb-3">
                            <label htmlFor='password' className='mb-2'>Password</label>
                            <input ref={passwordRef} type='password' id='password' className='form-control mb-3' />
                        </div>
                        <div className="form-field mb-3">
                            <label htmlFor='password_confirmation' className='mb-2'>Password Confirmation</label>
                            <input ref={passwordConfirmationRef} type='password' id='password_confirmation' className='form-control mb-3' />
                        </div>
                        <div className="row mt-5 align-items-center">
                            <div className="col-5">
                                <Link className="w-100" to="/login">Login</Link>
                            </div>
                            <div className="col-7">
                                <input type='button' value='Register' className='btn btn-dark' onClick={register} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Register