import "./InventoryTable.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function InventoryTable({
  isOpen,
  setIsOpen,
  setPage,
  setInventory,
  warehouseId,
}) {
  const [inventories, setInventories] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;
  const sortSvg = (
    <svg className="inventory-table__sort" viewBox="0 0 24 24">
      <path d="M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z" />
    </svg>
  );

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const endpoint = warehouseId
          ? `${baseUrl}/warehouses/${warehouseId}/inventories`
          : `${baseUrl}/inventories/`;

        const response = await axios.get(endpoint);
        setInventories(response.data);
        let categories = new Set(response.data.map((i) => i.category));
      } catch (error) {
        console.error("There is an error loading this page", error);
      }
    };

    fetchInventories();
  }, [warehouseId, isOpen, baseUrl]);

  return (
    <>
      <div className="inventory-table">
        <div className="inventory-table__tablets-titles">
          <div className="tablets-titles__container">
            <div
              className={`tablets-titles__left ${
                warehouseId ? "tablets-titles__left--no-warehouse" : ""
              }`}
            >
              <h4 className="inventory-table__title inventory-table__title--top inventory-table__title--item-name">
                Inventory Item {sortSvg}
              </h4>
              <h4 className="inventory-table__title inventory-table__title--top">
                {" "}
                Category{sortSvg}
              </h4>
            </div>
            <div
              className={`tablets-titles__right ${
                warehouseId ? "tablets-titles__right--no-warehouse" : ""
              }`}
            >
              <h4 className="inventory-table__title inventory-table__title--top">
                {" "}
                Status {sortSvg}
              </h4>
              <h4 className="inventory-table__title inventory-table__title--top quantity">
                {warehouseId ? "Quantity" : "Qty"} {sortSvg}
              </h4>
              {!warehouseId && (
                <h4 className="inventory-table__title inventory-table__title--top warehouse-name">
                  Warehouse {sortSvg}
                </h4>
              )}
            </div>
          </div>

          <h4 className="inventory-table__title inventory-table__title--top tablets-titles__actions">
            Actions{" "}
          </h4>
        </div>
        {inventories.map((inventory) => (
          <div key={inventory.id}>
            <div className="inventory-table__content">
              <div className="inventory-table__top">
                <div
                  className={`inventory-table__left ${
                    warehouseId ? "inventory-table__left--no-warehouse" : ""
                  }`}
                >
                  <div className="inventory-table__item">
                    <h3 className="inventory-table__title">Inventory Item</h3>
                    <Link to={`/inventories/${inventory.id}`}>
                      <div className="inventory-table__item-container">
                        <p className="inventory-table__item-name">
                          {inventory.item_name}
                        </p>
                        <svg
                          className="inventory-table__right-arrow"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9.99997 6L8.58997 7.41L13.17 12L8.58997 16.59L9.99997 18L16 12L9.99997 6Z"
                            fill="#2E66E6"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                  <div className="inventory-table__category">
                    <h3 className="inventory-table__title">Category</h3>
                    <p className="inventory-table__category-text">
                      {inventory.category}
                    </p>
                  </div>
                </div>

                <div
                  className={`inventory-table__right ${
                    warehouseId ? "inventory-table__right--no-warehouse" : ""
                  }`}
                >
                  <div className="inventory-table__status">
                    <h3 className="inventory-table__title">Status</h3>
                    <div className="inventory-table__status-tag-container">
                      <h4
                        className={`inventory-table__status-tag ${
                          inventory.status === "In Stock"
                            ? "inventory-table__status-tag--stocked"
                            : "inventory-table__status-tag--not-stocked"
                        }`}
                      >
                        {inventory.status}
                      </h4>
                    </div>
                  </div>
                  <div className="inventory-table__quantity">
                    <h3 className="inventory-table__title">Qty</h3>
                    <p className="inventory-table__text content-quantity">
                      {inventory.quantity}
                    </p>
                  </div>
                  {!warehouseId && (
                    <div className="inventory-table__warehouse">
                      <h3 className="inventory-table__title">Warehouse</h3>
                      <p className="inventory-table__text warehouse-name">
                        {inventory.warehouse_name}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="inventory-table__bottom">
                <svg
                  className="inventory-table__delete"
                  onClick={() => {
                    setIsOpen((prev) => !prev);
                    setPage("inventory");
                    setInventory(inventory);
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                    fill="#C94515"
                  />
                </svg>

                <Link to={`/inventories/${inventory.id}/edit`}>
                  <svg
                    className="inventory-table__edit"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z"
                      fill="#2E66E6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
