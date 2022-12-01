import { Link } from "react-router-dom"

const PostsList = () => {
    return (
        <ul>
            <li>
                <Link to='/blog/experience-the-effects-of-miraculous-stones'>Feras</Link>
            </li>
            <li>
                <Link to='/blog/2020-trends-in-health-tourism'>Hassan</Link>
            </li>
            <li>
                <Link to='/blog/opened-the-doors-of-the-damascus-spa-center'>Ayham</Link>
            </li>
            <li>
                <Link to='/blog/how-to-become-a-good-vlogger'>Mais</Link>
            </li>
        </ul>
    )
}

export default PostsList