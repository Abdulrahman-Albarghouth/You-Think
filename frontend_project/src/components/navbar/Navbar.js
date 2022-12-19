import './Navbar.css';
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ExploreIcon from '@mui/icons-material/Explore';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Navbar = ({children}) => {
  const links = [
    {
      target: "/",
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      target: "/messages",
      text: "Messages",
      icon: <EmailIcon />,
    },
    {
      target: "/bookmarks",
      text: "Bookmarks",
      icon: <BookmarksIcon />,
    },
    {
      target: "/explore",
      text: "Explore",
      icon: <ExploreIcon />,
    },
    {
      target: "/lists",
      text: "Lists",
      icon: <ViewListIcon />,
    },
    {
      target: "/profile",
      text: "Profile",
      icon: <PersonIcon />,
    },
    {
      target: "/LogOut",
      text: "Sign Out",
      icon: <LockIcon />,
    },
  ];

  return (
    <div className='wrapper'>
    <header>
      <nav>
        <img
          className="logo"
          src="https://ferasjobeir.com/frontend-app/static/media/logo.1bb8db420e540d66b7c4a6a8350ca833.svg"
          alt=""
        />
        <div className="menu" id="navbarNav">
          {links.map((link, i) => {
            return (
              <NavLink to={link.target} key={i} className="menuItem">
                <div className="icon">{link.icon}</div>
                <div>{link.text}</div>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </header>
    {children}
    </div>
  );
};

export default Navbar;
