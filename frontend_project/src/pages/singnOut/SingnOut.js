import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const SignOut = () => {
    const { signOut } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        signOut()
        setTimeout(() => {
            navigate('/login')
        }, )
    }, [])
    return (
        <></>
    )
}

export default SignOut