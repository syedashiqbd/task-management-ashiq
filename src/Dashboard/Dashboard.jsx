import {
  FaBullhorn,
  FaCommentSlash,
  FaHome,
  FaList,
  FaPen,
  FaPenSquare,
  FaUserAlt,
  FaUsers,
} from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import { Link, NavLink, Outlet } from 'react-router-dom';

import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Navbar from '../components/Navbar';

const Dashboard = () => {
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

  return (
    <div className=" mx-auto">
      <Navbar></Navbar>
      <div className="grid grid-cols-12">
        {/* dashboard sidebar */}
        <div className=" col-span-3 min-h-screen bg-[#161616] text-white py-10 px-10">
          <ul className="menu space-y-2 mt-5 lg:text-base">
            <li>
              <NavLink to="/dashboard">
                <FaList></FaList>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addTask">
                <FaPen></FaPen>
                Add Task
              </NavLink>
            </li>

            {/* shared common */}
            <div className="h-[1px] w-full bg-gray-500"></div>
            <div className="flex justify-between flex-col  font-bold ">
              <li>
                <NavLink to="/">
                  <FaHome></FaHome>
                  Home
                </NavLink>
              </li>
              {user && (
                <li className="fixed bottom-0">
                  <Link onClick={handleLogOut}>
                    <LuLogOut></LuLogOut>
                    Logout
                  </Link>
                </li>
              )}
            </div>
          </ul>
        </div>

        {/* dashboard content */}
        <div className=" col-span-9 m-10 w-10/12">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
