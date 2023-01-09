import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const Tweets = () => {
    const { token } = useContext(AuthContext)
    const [tweets, setTweets] = useState([])
    useEffect(() => {
        const getTweets = async () => {
            const response = await fetch('http://ferasjobeir.com/api/posts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const json = await response.json()
            setTweets(json.data)
        }
        getTweets()
    }, [])
    return (
        <div>
            {
                tweets.map((tweet, i) => {
                    return (
                        <div key={i}>
                            {tweet.content}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Tweets