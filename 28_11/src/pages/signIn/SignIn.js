import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const SignIn = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    const authCtx = useContext(AuthContext)

    const signIn = async () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const response = await fetch('http://ferasjobeir.com/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (json.success) {
            // logged in successfully
            authCtx.signIn(json.data, json.token)
                navigate('/')
        } else {
            window.alert(json.messages[0])
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4 my-4">
                    <div className="signup">
                        <label htmlFor='email' className='mb-2'>Email Address</label>
                        <input ref={emailRef} type='email' id='email' className='form-control mb-3' />

                        <label htmlFor='password' className='mb-2'>Password</label>
                        <input ref={passwordRef} type='password' id='password' className='form-control mb-3' />

                        <input type='button' value='Sign In' className='btn btn-dark' onClick={signIn} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn