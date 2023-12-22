import { FaHome, FaList, FaPen } from 'react-icons/fa';
import { LuLogOut } from 'react-icons/lu';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Navbar from '../components/Navbar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../components/Loading';
import TaskCard from '../components/TaskCard';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const {
    data: allTask,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['allTask'],
    queryFn: async () => {
      const res = await axios.get(
        `https://task-management-server-blue.vercel.app/allTask/${user?.email}`
      );
      return res.data;
    },
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setTasks(allTask || []);
    }
  }, [isLoading, allTask]);

  const handleDragDrop = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === 'group') {
      const reorderTask = [...tasks];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removeTask] = reorderTask.splice(sourceIndex, 1);
      reorderTask.splice(destinationIndex, 0, removeTask);

      return setTasks(reorderTask);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://task-management-server-blue.vercel.app/allTask/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success('Task deleted successfully');
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  // console.log(tasks);

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
            <DragDropContext onDragEnd={handleDragDrop}>
              {/* To do  */}
              <div className="text-center border rounded p-4 bg-yellow-300">
                <span className="font-bold">TO-DO</span>
                {/* Single task card */}
                <Droppable droppableId="ROOT" type="group">
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks.map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="mt-3"
                            >
                              <TaskCard
                                task={task}
                                handleDelete={handleDelete}
                              ></TaskCard>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>

              {/* ONGOING */}
              <div className="text-center border rounded p-4 bg-purple-300">
                <span className="font-bold">ONGOING</span>
                <Droppable droppableId="ONGOING" type="group">
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {/* Render the tasks for the ONGOING list here */}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </div>

              {/* Completed */}
              <div className="text-center border rounded p-4 bg-green-300 ">
                <span className="font-bold ">COMPLETED</span>
                {/* Single task card */}
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
