import loginSVG from '../assets/login.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
  const { logIn, googleSignIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    logIn(email, password)
      .then(() => {
        toast.success('Successfully logged-in', {
          style: {
            background: '#4F46E5',
            color: 'white',
          },
        });
        // e.target.reset();

        // navigate after login
        navigate(location?.state ? location.state : '/');
      })
      .catch(() => {
        toast.error('Invalid-login-credentials', {
          style: {
            background: '#790e0e',
            color: 'white',
          },
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success('Successfully logged-in', {
          style: {
            background: '#4F46E5',
            color: 'white',
          },
        });

        // navigate after login
        navigate(location?.state ? location.state : '/');
      })
      .catch(() => {
        toast.error('Logged In failed !!', {
          style: {
            background: '#F2277E',
            color: 'white',
          },
        });
      });
  };
  return (
    <div className="bg-white ">
      <div className="lg:w-[1152px] w-[400px] mx-auto">
        <div className="lg:flex items-center justify-center mt-20 pb-20 gap-10">
          <div className="text-center lg:text-left">
            <img className="w-[500px]" src={loginSVG} alt="" />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-8 text-center px-10 ">
              Login now !
            </h1>
            <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
              <form onSubmit={handleLogin} className="card-body ">
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
                  <button className="btn bg-[#FFB400] text-white">Login</button>
                </div>
                <p className=" label-text-alt text-center ">
                  Don't have account? Please{' '}
                  <Link to="/register" className="link-hover font-semibold">
                    Register
                  </Link>
                </p>
              </form>
            </div>
            <div className="flex flex-col w-full border-opacity-50 mb-4"></div>
            <div className="divider mt-10 ">Login With</div>
            <div className="grid card  rounded-box  ">
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleGoogleSignIn}
                  className=" lg:py-3 lg:px-5 py-1 px-2 bg-gray-200 text-gray-700   rounded  flex items-center justify-center gap-1  "
                >
                  <FcGoogle className="text-4xl"></FcGoogle>Login with Google
                </button>
                <button className="lg:py-3 lg:px-5 py-1 px-2 bg-gray-200 text-gray-700    rounded  flex items-center justify-center gap-1 ">
                  <BsGithub className="text-4xl"></BsGithub>Login with Github
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
