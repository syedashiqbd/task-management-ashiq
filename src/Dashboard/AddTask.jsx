import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Providers/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const taskInfo = {
      email: user.email,
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      priority: data.priority,
      status: 'to-do',
    };
    console.log(taskInfo);

    // calling api to insert task in database
    axios
      .post('http://localhost:5000/addPost', taskInfo)
      .then((res) => {
        if (res.data.insertedId) {
          navigate('/dashboard');
          toast.success('Task added successfully');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center mb-10">Add Task</h1>

      <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100 lg:w-8/12 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="title"
              {...register('title', { required: true })}
              placeholder="Task Title"
              className="input input-bordered"
            />
            {errors.title && (
              <span className="text-red-600">Title is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              type="description"
              {...register('description', { required: true })}
              placeholder="Task Description"
              className="input input-bordered p-3 h-36"
            />
            {errors.description && (
              <span className="text-red-600">Description is required</span>
            )}
          </div>
          <div className="flex gap-6 ">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <input
                type="date"
                {...register('deadline', { required: true })}
                placeholder="Task Deadline"
                className="input input-bordered"
              />
              {errors.deadline && (
                <span className="text-red-600">Deadline is required</span>
              )}
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select
                {...register('priority', { required: true })}
                defaultValue=""
                className="select select-bordered  text-slate-500"
              >
                <option disabled value="">
                  Select Priority
                </option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="hight">High</option>
              </select>
              {errors.priority && (
                <span className="text-red-600">Priority is required</span>
              )}
            </div>
          </div>

          <div className="form-control mt-6 text-center">
            <input
              className="btn btn-primary mb-3"
              type="submit"
              value="Add Task"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddTask;
