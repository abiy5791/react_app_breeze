import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSubcategories } from "../api";
import { Link } from "react-router-dom";
import { Row, Button } from "reactstrap";
import CircularProgress from "../CircularProgress";
import BackArrow from "../BackArrow";
import UpdatedTime from "../UpdatedTime";

const Subcategories = () => {
  const style = {
    margin: "8px",
    padding: "8px",
  };
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubcategories(categoryId)
      .then((response) => {
        setSubcategories(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of error too
      });
  }, [categoryId]);

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
      <Link to={`/categoryitems`}>
        <button style={style} type="button" className="btn">
          <BackArrow />
        </button>
      </Link>

      {subcategories.length === 0 ? (
        // Display a message when there are no subcategories
        <h5 className="text-center">No subcategories available.</h5>
      ) : (
        subcategories.map((subcategory) => (
          <div className="card" key={subcategory.id} style={style}>
            <div className="card-body">
              <h5 className="card-title">{subcategory.sub_food_name}</h5>
              <p className="card-text">{subcategory.sub_food_description}</p>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {"Updated "} {UpdatedTime(subcategory.updated_at)}
              </h6>
              <h6>Price: {subcategory.sub_food_price} Birr</h6>
            </div>
          </div>
        ))
      )}
    </Row>
  );
};

export default Subcategories;
