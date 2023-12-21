import registerSVG from '../assets/register.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import toast from 'react-hot-toast';

const Register = () => {
  const { createUser, userProfileUpdate } = useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password, name, photo)
      .then((result) => {
        console.log(result.user);

        toast.success('You have register successfully', {
          style: {
            background: '#4F46E5',
            color: 'white',
          },
        });
        e.target.reset();

        userProfileUpdate(name, photo).then(() => {
          console.log(result.user, 'user profile update also');
        });
        window.location.reload();
      })
      .catch((err) =>
        toast.error(err.message, {
          style: {
            background: '#790e0e',
            color: 'white',
          },
        })
      );
  };
  return (
    <div className="my-10 ">
      <div className="lg:w-[1152px] w-[400px] mx-auto pb-10">
        <div className="lg:flex items-center justify-center mt-20 gap-10">
          <div className="text-center lg:text-left">
            <img className="w-[600px]" src={registerSVG} alt="" />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-8 text-center ">
              Register Please!
            </h1>
            <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
              <form onSubmit={handleRegister} className="card-body ">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo</span>
                  </label>
                  <input
                    type="text"
                    name="photo"
                    placeholder="Enter photo URL"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered"
                    required
                  />

                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6 ">
                  <button className="btn bg-[#FFB400] text-white">
                    Register
                  </button>
                </div>
                <p className=" label-text-alt text-center ">
                  Already have account? Please{' '}
                  <Link to="/login" className="link-hover font-semibold">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
