import Loader from "./Loader";

const Header = () => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
          <div className="grid grid-cols-2">
            Hola
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;