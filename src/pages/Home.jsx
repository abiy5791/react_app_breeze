import { useState } from "react";
import CategoryList from "../components/CategoryList";
import useAuthContext from "../context/AuthContext";

const Home = () => {
  const { user } = useAuthContext();
  const [alertVisible, setalertVisibility] = useState(true);
  return (
    <>
      {alertVisible && (
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          Welcome <strong>{user?.name} </strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setalertVisibility(false)}
          ></button>
        </div>
      )}
      <div>
        <CategoryList />
      </div>
    </>
  );
};

export default Home;
