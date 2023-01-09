import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BlogLayout from "../../components/blogLayout/BlogLayout "

const Post = () => {
    const { slug } = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        fetch(`https://www.wp-course.site/wp-json/youthink/post?slug=${slug}`)
            .then((response) => {
                return response.json().then((json) => {
                    setPost(json.data)
                })
            })
            .catch()
    }, [slug])

    return (
        <BlogLayout title={post.title}>
            <div dangerouslySetInnerHTML={{__html: post.content}}></div>
        </BlogLayout>
    )
}

export default Post