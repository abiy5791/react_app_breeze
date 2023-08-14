import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSubCategory, updateSubcategory } from "./api";
import { useNavigate } from "react-router";
import InputForm from "./InputForm";
import { Link } from "react-router-dom";
import BackArrow from "./BackArrow";

const SubcategoryUpdate = () => {
  const navigate = useNavigate();
  const { categoryId, subcategoryId } = useParams();
  const [subcategoryData, setSubcategoryData] = useState({
    sub_food_name: "",
    sub_food_description: "",
    sub_food_price: "",
  });

  useEffect(() => {
    fetchSubCategory(categoryId, subcategoryId)
      .then((response) => setSubcategoryData(response.data))
      .catch((error) => console.error(error));
  }, [categoryId, subcategoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubcategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSubcategory(categoryId, subcategoryId, subcategoryData)
      .then(() => {
        navigate(`/subcategories/${categoryId}`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Link to={`/subcategories/${categoryId}`}>
        <button type="button" className="btn">
          <BackArrow />
        </button>
      </Link>
      <div class="d-flex justify-content-center">
        <h5>Update {subcategoryData.sub_food_name} Subcategory</h5>
      </div>
      <InputForm
        handlesubmit={handleSubmit}
        handlechange={handleChange}
        namevalue={subcategoryData.sub_food_name}
        descriptionvalue={subcategoryData.sub_food_description}
        image_or_pricevalue={subcategoryData.sub_food_price}
        number_or_text={"number"}
        labelimage_or_price={"Price"}
        namefield={"sub_food_name"}
        descfield={"sub_food_description"}
        image_or_pricefield={"sub_food_price"}
        create_or_update={"Update"}
      />
    </div>
  );
};

export default SubcategoryUpdate;
