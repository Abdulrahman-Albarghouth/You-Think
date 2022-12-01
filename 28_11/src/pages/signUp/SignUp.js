import { useEffect, useRef, useState } from 'react'
import './SignUp.css'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
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
        const response = await fetch('http://ferasjobeir.com/api/users/register', {
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
                navigate('/signin')
            }, 2000)
        } else {
            window.alert(json.messages[0])
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4 my-4">
                    <div className="signup">
                        <label htmlFor='name' className='mb-2'>Name</label>
                        <input ref={nameRef} type='text' id='name' className='form-control mb-3' />

                        <label htmlFor='email' className='mb-2'>Email Address</label>
                        <input ref={emailRef} type='email' id='email' className='form-control mb-3' />

                        <label htmlFor='password' className='mb-2'>Password</label>
                        <input ref={passwordRef} type='password' id='password' className='form-control mb-3' />

                        <label htmlFor='password_confirmation' className='mb-2'>Password Confirmation</label>
                        <input ref={passwordConfirmationRef} type='password' id='password_confirmation' className='form-control mb-3' />

                        <input type='button' value='Register' className='btn btn-dark' onClick={register} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp