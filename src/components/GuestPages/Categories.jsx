import React, { useState, useEffect } from "react";
import { fetchCategories } from "../api";
import { Row, Col } from "reactstrap";
import UpdatedTime from "../UpdatedTime";
import CircularProgress from "../CircularProgress";
import FoodCard from "../FoodCard";

const Categories = () => {
  const style = {
    margin: "8px 0px 8px 0px",
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
      {categories.map((category) => (
        <Col
          sm="5"
          lg="5"
          xl="3"
          className="mx-auto d-flex justify-content-center"
          key={category.id}
          style={style}
        >
          <FoodCard
            image={category.cat_food_image}
            title={category.cat_food_name}
            subtitle={UpdatedTime(category.updated_at)}
            text={category.cat_food_description}
            id={category.id}
            subcategory_or_subcategories={"subcategory"}
            showEDbuttons={false}
          />
        </Col>
      ))}
    </Row>
  );
};

export default Categories;
