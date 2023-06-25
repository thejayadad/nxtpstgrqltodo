"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Player = {
    id: number;
    name: string;
    number: number;
    teamId: number;
};


const DeleteProduct = ({ player }: { player: Player }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const router = useRouter();
  
    const handleDelete = async (playerId: number) => {
      setIsLoading(true);
      await axios.delete(`/api/players/${playerId}`);
      setIsLoading(false);
      router.refresh();
      setIsOpen(false);
    };
  
    const handleModal = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div>
        <button onClick={handleModal}>
          Delete
        </button>
  
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Are sure to delete {player.name}?
            </h3>
  
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                No
              </button>
              {!isLoading ? (
                <button
                  type="button"
                  onClick={() => handleDelete(player.id)}
                  className="btn btn-primary"
                >
                  Yes
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Deleting...
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteProduct;

