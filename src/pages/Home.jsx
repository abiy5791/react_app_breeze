import useAuthContext from "../context/AuthContext";

const Home = () => {
  const { user } = useAuthContext();
  return <div className="max-w-7xl mx-auto mt-6">{user?.name}</div>;
};

export default Home;
