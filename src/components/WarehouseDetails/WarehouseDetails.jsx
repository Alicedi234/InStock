import "./WarehouseDetails.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import InventoryTable from "../InventoryTable/InventoryTable";

export default function WarehouseDetails({
  isOpen,
  setIsOpen,
  setPage,
  setInventory,
}) {
  const { warehouseId } = useParams();
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/warehouses/${warehouseId}`
        );
        setWarehouse(response.data);
        setNotFound(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching item:", error);
        setNotFound(true);
      }
      setLoading(false);
    };

    if (warehouseId) {
      fetchWarehouse();
    }
  }, [warehouseId, baseUrl]);

  if (loading) return <p>Loading...</p>;

  if (notFound) return <p>Warehouse not found.</p>;

  return (
    <>
      <div className="warehouse">
        <div className="warehouse__top">
          <div className="warehouse__heading">
            <Link className="warehouse__link" to="/warehouses">
              <svg
                className="warehouse__back-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"></path>
              </svg>
            </Link>
            <h1 className="warehouse__name">{warehouse.warehouse_name}</h1>
          </div>
          <button className="warehouse__button">
            <Link
              className="warehouse__link"
              to={`/warehouses/${warehouseId}/edit`}
            >
              {" "}
              <svg
                className="warehouse__edit-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"></path>
              </svg>
              <span className="warehouse__button-text">Edit</span>{" "}
            </Link>{" "}
          </button>
        </div>
        <div className="warehouse__bottom">
          <div className="warehouse__address">
            <h3 className="warehouse__title">Warehouse Address:</h3>
            <p className="warehouse__text--mobile">
              {warehouse.address +
                ", " +
                warehouse.city +
                ", " +
                warehouse.country}
            </p>
            <p className="warehouse__text--tablet">{warehouse.address + ","}</p>
            <p className="warehouse__text--tablet">
              {warehouse.city + ", " + warehouse.country}
            </p>
          </div>
          <div className="warehouse__contact">
            <div className="warehouse__info">
              <h3 className="warehouse__title">Contact Name:</h3>
              <p className="warehouse__text">{warehouse.contact_name}</p>
              <p className="warehouse__text">{warehouse.contact_position}</p>
            </div>
            <div className="warehouse__info">
              <h3 className="warehouse__title">Contact Information:</h3>
              <p className="warehouse__text">{warehouse.contact_phone}</p>
              <p className="warehouse__text">{warehouse.contact_email}</p>
            </div>
          </div>
        </div>
        <InventoryTable
          warehouseId={warehouseId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setPage={setPage}
          setInventory={setInventory}
        />
      </div>
    </>
  );
}
