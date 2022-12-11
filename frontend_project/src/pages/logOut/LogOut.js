import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import Loading from "../../components/loading/Loading"

const LogOut = () => {
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            logOut()
            navigate('/login')
        }, 1000)
    }, [])
    return (
        <>
        <Loading />
        </>
    )
}

export default LogOut