import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="lg:max-w-[1280px] mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Root;
