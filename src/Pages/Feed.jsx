import Navbar from "./../components/Navbar";
import Main from "./../components/Main";
import Aside from "./../components/Aside";

const Feeed = () => {
  
  return (
    <section className="flex bg-black min-h-screen max-w-[1500px] mx-auto">
      <Navbar />
      <Main />
      <Aside />
    </section>
  );
};

export default Feeed;
