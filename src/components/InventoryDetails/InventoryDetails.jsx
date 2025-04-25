import "./InventoryDetails.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function InventoryDetails() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${baseUrl}/inventories/${itemId}`);
        setItem(response.data);
        setNotFound(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setNotFound(true);
      }
      setLoading(false);
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId, baseUrl]);

  if (loading) return <p>Loading...</p>;

  if (notFound) return <p>Item not found.</p>;

  return (
    <div className="item">
      <div className="item__top">
        <div className="item__heading">
          <Link className="item__link" to="/inventories">
            <svg
              className="item__back-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"></path>
            </svg>
          </Link>
          <h1 className="item__name">{item.item_name}</h1>
        </div>
        <button className="item__button">
          <Link className="item__link" to={`/inventories/${itemId}/edit`}>
            {" "}
            <svg
              className="item__edit-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"></path>
            </svg>
            <span className="item__button-text">Edit</span>{" "}
          </Link>{" "}
        </button>
      </div>
      <div className="item__bottom">
        <div className="item__availability">
          <h3 className="item__title">Item description:</h3>
          <p className="item__text spacing">{item.description}</p>
          <h2 className="item__title">Category:</h2>
          <p className="item__text"> {item.category}</p>
        </div>
        <div className="item__availability item__availability--border">
          <div className="item__inventory">
            <div className="item__stock spacing">
              <h3 className="item__title">Status:</h3>
              <h4
                className={`item__tag ${
                  item.status === "In Stock"
                    ? "item__tag--stocked"
                    : "item__tag--not-stocked"
                }`}
              >
                {item.status}
              </h4>
            </div>
            <div className="item__stock">
              <h3 className="item__title">Quantity:</h3>
              <p className="item__text">{item.quantity}</p>
            </div>
          </div>
          <h3 className="item__title">Warehouse:</h3>
          <p className="item__text">{item.warehouse_name}</p>
        </div>
      </div>
    </div>
  );
}
