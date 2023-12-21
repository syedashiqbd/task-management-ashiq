import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? ' underline decoration-red-900 mr-4 ' : 'mr-4'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? ' underline decoration-red-900 mr-4 ' : 'mr-4'
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive ? ' underline decoration-red-900 mr-4 ' : 'mr-4'
        }
      >
        Register
      </NavLink>
    </>
  );
  return (
    <div className="bg-gray-200 m-0 p-0">
      <div className="lg:max-w-[1440px]  mx-auto flex items-center justify-between py-4">
        <div className="flex ">
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
          <p className=" font-bold text-2xl">Task Management</p>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg ">{navLinks}</ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
