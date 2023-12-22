import Banner from '../components/Banner';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <h1 className="text-center my-10 text-4xl font-bold">
        Best Professional Use our <br /> Task Management
      </h1>
      <div className="lg:max-w-[1440px] mx-auto ">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 lg:gap-6">
          <p className="py-10 px-12 bg-slate-500 rounded text-3xl text-white text-center">
            Developers
          </p>
          <p className="py-10 px-12 bg-slate-500 rounded text-3xl text-white text-center">
            Students
          </p>
          <p className="py-10 px-12 bg-slate-500 rounded text-3xl text-white text-center">
            Bankers
          </p>
          <p className="py-10 px-12 bg-slate-500 rounded text-3xl text-white text-center">
            Doctors
          </p>
          <p className="py-10 px-12 bg-slate-500 rounded text-3xl text-white text-center">
            Engineers
          </p>
          <p className="py-10 px-12 bg-slate-500 rounded text-3xl text-white text-center">
            Lawyer
          </p>
          <p className="py-10 px-12 bg-slate-500 rounded text-3xl text-white text-center">
            Entrepreneur
          </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
