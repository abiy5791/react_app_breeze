import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "./api";
import InputForm from "./InputForm";
import { Link } from "react-router-dom";
import BackArrow from "./BackArrow";

const CategoryCreate = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    cat_food_name: "",
    cat_food_description: "",
    cat_food_image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createCategory(categoryData)
      .then(() => {
        navigate("/categories");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Link to={`/categories`}>
        <button type="button" className="btn">
          <BackArrow />
        </button>
      </Link>
      <div class="d-flex justify-content-center">
        <h5>Create New Food Category</h5>
      </div>
      <InputForm
        handlesubmit={handleSubmit}
        namevalue={categoryData.cat_food_name}
        handlechange={handleChange}
        descriptionvalue={categoryData.cat_food_description}
        image_or_pricevalue={categoryData.cat_food_image}
        number_or_text={"text"}
        labelimage_or_price={"ImageURL"}
        namefield={"cat_food_name"}
        descfield={"cat_food_description"}
        image_or_pricefield={"cat_food_image"}
        create_or_update={"Create"}
      />
    </div>
  );
};

export default CategoryCreate;
