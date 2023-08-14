import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteCategory } from "./api";
import BackArrow from "./BackArrow";

const CategoryDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    deleteCategory(id)
      .then(() => navigate("/categories"))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Link to={`/categories`} className="mb-3">
        <button type="button" className="btn">
          <BackArrow />
        </button>
      </Link>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <h4 className="mb-6 text-center font-weight-bold text-danger">
          Confirm Subcategory Deletion
        </h4>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </>
  );
};

export default CategoryDelete;
