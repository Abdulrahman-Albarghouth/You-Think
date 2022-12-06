import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const LogIn = () => {
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
            authCtx.signIn(json.data, json.token)
                navigate('/')
        } else {
            window.alert(json.messages[0])
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <div class="my-5 p-5">
                        <div class=" mb-4">
                            <img width={100} src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg" alt=""/>
                        </div>
                        <h1 class=" mb-4">Login</h1>
                        <div class="form-field mb-3">
                            <label htmlFor='email' className='mb-2'>Email Address</label>
                            <input ref={emailRef} type='email' id='email' className='form-control mb-3' />
                        </div>
                        <div class="form-field mb-3">
                            <label htmlFor='password' className='mb-2'>Password</label>
                            <input ref={passwordRef} type='password' id='password' className='form-control mb-3' />
                        </div>
                        <div class="row mt-5 align-items-center">
                            <div class="col-5">
                                <Link className="" to="/register">Register</Link>
                            </div>
                            <div class="col-7">
                                <input type='button' value='Sign In' className='btn btn-dark' onClick={signIn} />
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn