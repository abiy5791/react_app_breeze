import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteSubcategory } from "./api";
import BackArrow from "./BackArrow";

const SubcategoryDelete = () => {
  const navigate = useNavigate();
  const { categoryId, subcategoryId } = useParams();

  const handleDelete = () => {
    deleteSubcategory(categoryId, subcategoryId)
      .then(() => navigate(`/subcategories/${categoryId}`))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Link to={`/subcategories/${categoryId}`} className="mb-3">
        <button type="button" className="btn">
          <BackArrow />
        </button>
      </Link>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <h5 className="mb-4 text-center font-weight-bold text-danger">
          Confirm Subcategory Deletion
        </h5>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </>
  );
};

export default SubcategoryDelete;
