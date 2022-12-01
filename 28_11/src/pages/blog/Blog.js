import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BlogLayout from "../../components/blogLayout/BlogLayout "

const Blog = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch(`https://www.wp-course.site/wp-json/youthink/posts`)
            .then((response) => {
                return response.json().then((json) => {
                    setPosts(json.data)
                })
            })
    }, [])
    return (
        <BlogLayout title="Blog">
            {
                posts.map((post, i) => {
                    return (
                        <div className="mb-4" key={i}>
                            <Link to={`/blog/${post.slug}`}>
                                <h6 className="text-center">{post.title}</h6>
                                <img src={post.thumbnail} />
                            </Link>
                        </div>
                    )
                })
            }
        </BlogLayout>
    )
}

export default Blog