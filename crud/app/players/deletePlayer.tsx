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
        setIsOpen((curState) => {
            return !curState;
        })
      };
  
    return (
      <>
        <button onClick={handleModal}>
          Delete
        </button>
        {isOpen &&
        <div className={isOpen ? "modal-open" : "modal"}>
          <div className="modal-box bg-white border-md text-black p-3">
            <h3 className="font-bold text-lg">
              Are sure to delete {player.name}?
            </h3>
  
            <div className="modal-action text-center">
              <button 
              className="mr-3 p-2 bg-orange-200"
              onClick={handleModal}>
                No
              </button>
              {!isLoading ? (
                <button
                  onClick={() => handleDelete(player.id)}
                  className="p-2 bg-green-500">
                 Yes
                </button>
              ) : (
                <button className="btn loading">
                  Deleting...
                </button>
              )}
            </div>
          </div>
        </div>
            }
      </>
    );
  };
  
  export default DeleteProduct;

