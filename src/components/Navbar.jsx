import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import userDefaultPic from '../assets/user.png';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogOut = () => {
    logout();
    toast.success('Successfully logged-out', {
      style: {
        background: '#5F2DED',
        color: 'white',
      },
    });
  };
  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? ' underline decoration-[#FFB400] mr-4 ' : 'mr-4'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? ' underline decoration-[#FFB400] mr-4 ' : 'mr-4'
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive ? ' underline decoration-[#FFB400] mr-4 ' : 'mr-4'
        }
      >
        Register
      </NavLink>
    </>
  );
  return (
    <div className="bg-[#161616] text-white m-0 p-0">
      <div className="lg:max-w-[1440px] navbar mx-auto py-4">
        <div className="navbar-start flex ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#161616] rounded-lg w-52  "
            >
              {navLinks}
            </ul>
          </div>
          <p className=" font-bold text-xl text-center">
            Task <br /> Management
          </p>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg ">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end text-base-content ">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {user.photoURL ? (
                    <img className="rounded-full" src={user.photoURL} />
                  ) : (
                    <img src={userDefaultPic} />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-2"
              >
                <p className="font-bold text-center border-b-2 pb-2">
                  {user?.displayName}
                </p>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                  <p
                    onClick={handleLogOut}
                    className="bg-[#FFB400] text-white py-2  "
                  >
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn border-none rounded bg-[#FFB400] text-white lg:px-8 lg:py-2 px-6 py-1 ">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
