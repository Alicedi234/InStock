import "./DeleteModal.scss";
import axios from "axios";

export default function DeleteModal({
  isOpen,
  setIsOpen,
  page,
  inventory,
  warehouse,
}) {
  const baseUrl = import.meta.env.VITE_API_URL;

  let id = "";
  let endpoint = "";

  if (page === "warehouse") {
    id = warehouse.id;
    endpoint = "warehouses";
  }

  if (page === "inventory") {
    id = inventory.id;
    endpoint = "inventories";
  }

  const deleteItem = async (id, endpoint) => {
    if (!id || !endpoint) {
      console.error("Invalid ID or endpoint.");
      return;
    }

    try {
      await axios.delete(`${baseUrl}/${endpoint}/${id}`);
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDeleteClick = () => {
    if (!id || !endpoint) {
      console.error("ID or endpoint not set correctly");
      return;
    }

    deleteItem(id, endpoint);
  };

  if (
    (page === "warehouse" && !warehouse) ||
    (page === "inventory" && !inventory)
  ) {
    return null;
  }

  return (
    <div className={`background ${!isOpen ? "closed" : ""}`}>
      <div className={`modal ${!isOpen ? "closed" : ""}`}>
        <button className="modal__exit" onClick={() => setIsOpen(false)}>
          <svg
            className="modal__icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"></path>
          </svg>
        </button>
        <div className="modal__content">
          <h1 className="modal__heading">
            Delete{" "}
            {page === "inventory"
              ? `${inventory?.item_name ?? "selected item"} inventory item`
              : `${
                  warehouse?.warehouse_name ?? "selected warehouse"
                } warehouse`}
            ?
          </h1>
          <p className="modal__text">
            Please confirm that you'd like to delete
            {page === "inventory"
              ? ` the ${
                  inventory?.item_name ?? "selected item"
                } from the inventory list`
              : ` the ${
                  warehouse?.warehouse_name ?? "selected warehouse"
                } from the list of warehouses`}
            . You won't be able to undo this action.
          </p>
        </div>
        <div className="modal__cta">
          <button
            className="modal__button modal__button--cancel"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="modal__button modal__button--delete"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
