import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "@/contexts/ContextProvider";
//@ts-ignore
import Logo from "@/assets/BuddyMovieLogo.png";

const DefaultLayout = () => {

  const {token, setToken} = useStateContext();

  if (!token) {
    return <Navigate to="/welcome"/>
  }

  const handleLogout = (ev) => {
    ev.preventDefault();
    setToken("");
  };

  const flexBetween = "flex items-center justify-between";

  return (
    <nav>
      <div className={`${flexBetween} fixed top-0 w-full h-5 bg-red-400 py-10 z-30 px-10 shadow-2xl`}>
        <Link to="/main"><img alt="logo" src={Logo} className="md:h-14 xs:h-8 cursor-pointer"/></Link>
        <div className={`${flexBetween} md:gap-10 xs:gap-5 text-black xs:text-sm md:text-base`}>
          <p onClick={handleLogout} className="hover:text-white cursor-pointer">
            Logout
          </p>
          <p className="hover:text-white">
            <Link to="/create">Create offer</Link>
          </p>
          <p className="hover:text-white">
            <Link to="/profile">Profile</Link>
          </p>
        </div>
      </div>
      <Outlet/>
    </nav>
  );
};

export default DefaultLayout;