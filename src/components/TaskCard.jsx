/* eslint-disable react/prop-types */
import { FaPen, FaTrashAlt } from 'react-icons/fa';

const TaskCard = ({ task, handleDelete }) => {
  const { _id, title, description, priority, deadline } = task;

  return (
    <div className="rounded text-left bg-slate-100 p-3 shadow-lg">
      <div className="flex gap-2 items-center justify-between">
        <h1 className="text-lg font-medium">{title}</h1>
        <div className="flex gap-2 items-center">
          <FaPen className="text-blue-700"></FaPen>
          <button onClick={() => handleDelete(_id)}>
            <FaTrashAlt className="text-red-500"></FaTrashAlt>
          </button>
        </div>
      </div>
      <p className="my-2 text-sm">{description}</p>
      <div className="flex justify-between items-center mt-5">
        <p className="text-sm bg-primary py-1 px-2  text-white rounded ">
          {priority}
        </p>
        <p className="italic font-semibold">{deadline}</p>
      </div>
    </div>
  );
};
export default TaskCard;
