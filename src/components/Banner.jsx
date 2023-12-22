import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <div>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto px-4 py-16 lg:flex lg:h-[550px] lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Empower Team Synergy, Your Tasks, Our Solutions.
            </h1>
            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Fuel Your Success: Unlock Peak Productivity, Achieve More Every
              Day, and Transform Your Work Habits !
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/dashboard"
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/get-started"
              >
                Let's Explore
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default Banner;
