import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "./api";
import FoodCard from "./FoodCard";
import { Row, Col } from "reactstrap";
import UpdatedTime from "./UpdatedTime";
import CircularProgress from "./CircularProgress";

const CategoryList = () => {
  const style = {
    margin: "8px 0px 8px 0px",
  };
  const addStyle = {
    margin: "10px",
  };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    // Render a loading indicator while fetching data
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Row>
      <Row sm="5" lg="5" xl="3">
        <Link to={`/categories/create`}>
          <button style={addStyle} type="button" className="btn btn-primary">
            Add
          </button>
        </Link>
      </Row>

      {categories.map((category) => (
        <Col
          sm="5"
          lg="5"
          xl="3"
          className="mx-auto d-flex justify-content-center"
          key={category.id}
          style={style}
        >
          {/* <a href={`/subcategories/${category.id}`} className="link-as-text"> */}
          <FoodCard
            image={category.cat_food_image}
            title={category.cat_food_name}
            subtitle={UpdatedTime(category.updated_at)}
            text={category.cat_food_description}
            id={category.id}
            subcategory_or_subcategories={"subcategories"}
            showEDbuttons={true}
          />
          {/* </a> */}
        </Col>
      ))}
    </Row>
  );
};

export default CategoryList;
