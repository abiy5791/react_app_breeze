import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCategory, updateCategory } from "./api";
import { useNavigate } from "react-router";
import InputForm from "./InputForm";
import { Link } from "react-router-dom";
import BackArrow from "./BackArrow";

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const { category_id } = useParams();
  const [categoryData, setCategoryData] = useState({
    cat_food_name: "",
    cat_food_description: "",
    cat_food_image: "",
  });

  useEffect(() => {
    fetchCategory(category_id)
      .then((response) => setCategoryData(response.data))
      .catch((error) => console.error(error));
  }, [category_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(category_id, categoryData)
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
        <h5>Update {categoryData.cat_food_name} Category</h5>
      </div>
      <InputForm
        handlesubmit={handleSubmit}
        namevalue={categoryData.cat_food_name}
        handlechange={handleChange}
        descriptionvalue={categoryData.cat_food_description}
        image_or_pricevalue={categoryData.cat_food_image}
        number_or_text={"text"}
        create_or_update={"Update"}
        labelimage_or_price={"ImageURL"}
        namefield={"cat_food_name"}
        descfield={"cat_food_description"}
        image_or_pricefield={"cat_food_image"}
      />
    </div>
  );
};

export default CategoryUpdate;
