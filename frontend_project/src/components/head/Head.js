import './Head.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom'

const Head = ({page_name}) =>{
    return(
        <div className="head">
            <h4 className="m-0">{page_name}</h4>
            <div className="d-flex d-md-none">
                <div className="headIcon">
                    <Link to="/"><HomeIcon/></Link>
                </div>
                <div className="headIcon">
                <Link to="/profile"><PersonIcon/></Link>
                </div>
                <div className="headIcon">
                    <Link to="/logout"><LockIcon/></Link>
                </div>
            </div>
        </div>
    )
}

export default Head