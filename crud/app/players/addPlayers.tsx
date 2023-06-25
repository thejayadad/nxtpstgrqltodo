'use client'
import { useState, SyntheticEvent } from "react";

const AddPlayers = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
      };
  return (
    <section>

        <div>
        <button className="bg-gray-400 p-5 rounded-md text-white cursor-pointer" onClick={handleModal}>
        Add New
      </button>

        <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Players</h3>
        <form>
        <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Product Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand</label>
              <select
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a Brand
                </option>
                {/* {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))} */}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {/* {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )} */}
            </div>


        </form>

        </div>
        </div>
        </div>
    </section>
  )
}

export default AddPlayers