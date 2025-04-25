import InventoryTable from "../../components/InventoryTable/InventoryTable";
import "./InventoryHomePage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function InventoryHomePage({
  isOpen,
  setIsOpen,
  setPage,
  setInventory,
}) {
  const [inventories, setInventories] = useState([]);

  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchInventories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/inventories/`);
      setInventories(response.data);
    } catch (error) {
      console.error("There is an error loading this page", error);
    }
  };

  useEffect(() => {
    fetchInventories();
  }, [isOpen]);

  return (
    <div className="inventory">
      <div className="inventory__top">
        <h1 className="inventory__title">Inventory</h1>
        <div className="inventory-actions">
          <div className="inventory-searchbar">
            <input
              className="inventory-searchbar__input"
              type="text"
              placeholder="Search..."
            />
            <svg className="inventory-searchbar__icon" viewBox="0 0 24 24">
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14V14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="#5C667E"
              />
            </svg>
          </div>
          <Link to="/inventories/new" className="inventory__add-new">
            + Add New Item
          </Link>
        </div>
      </div>
      <div className="inventory__list">
        <InventoryTable
          inventories={inventories}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setPage={setPage}
          setInventory={setInventory}
        />
      </div>
    </div>
  );
}
