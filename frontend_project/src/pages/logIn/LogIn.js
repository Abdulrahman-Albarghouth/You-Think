import { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertContextNotification } from '../../contexts/AlertContextNotification'
import { AuthContext } from '../../contexts/AuthContext'

const LogIn = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    const authCtx = useContext(AuthContext)
    const { toggleOn } = useContext(AlertContextNotification);

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
        toggleOn(json.messages, json.success);

        if (json.success) {
            authCtx.logIn(json.data, json.token)
            navigate('/')
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <div className="my-5 p-5">
                        <div className=" mb-4">
                            <img width={100} src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg" alt=""/>
                        </div>
                        <h1 className=" mb-4">Login</h1>
                        <div className="form-field mb-3">
                            <label htmlFor='email' className='mb-2'>Email Address</label>
                            <input ref={emailRef} type='email' id='email' className='form-control mb-3' />
                        </div>
                        <div className="form-field mb-3">
                            <label htmlFor='password' className='mb-2'>Password</label>
                            <input ref={passwordRef} type='password' id='password' className='form-control mb-3' />
                        </div>
                        <div className="row mt-5 align-items-center">
                            <div className="col-5">
                                <Link className="" to="/register">Register</Link>
                            </div>
                            <div className="col-7">
                                <input type='button' value='LogIn' className='btn btn-dark' onClick={signIn} />
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn