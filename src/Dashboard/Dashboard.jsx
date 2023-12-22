import { FaHome, FaList, FaPen, FaTrashAlt } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import { Link, NavLink, Outlet } from 'react-router-dom';

import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Navbar from '../components/Navbar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../components/Loading';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const { data: allTask, isLoading } = useQuery({
    queryKey: ['allTask'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/allTask');
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  console.log(allTask);

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
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-3">
            <div className="text-center border rounded p-4 bg-yellow-300">
              <span className="font-bold">TO-DO</span>

              {/* Single task card */}
              <ul>
                {allTask?.map((task) => (
                  <li className="mt-3" key={task._id}>
                    <TaskCard task={task}></TaskCard>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center border rounded p-4 bg-purple-300 ">
              <span className="font-bold ">ONGOING</span>
              {/* Single task card */}
            </div>

            <div className="text-center border rounded p-4 bg-green-300 ">
              <span className="font-bold ">COMPLETED</span>
              {/* Single task card */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
