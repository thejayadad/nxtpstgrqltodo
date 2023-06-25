'use client'
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Team, } from "@prisma/client"; // Add the import statement for useClient


const AddPlayers = ({ teams }: { teams: Team[] }) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [team, setTeam] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  
    


    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.post("/api/players", {
          name: name,
          number: Number(number),
          teamId: Number(team),
        });
        setIsLoading(false);
        setName("");
        setNumber("");
        setTeam("");
        router.refresh();
        setIsOpen(false);
      };

    const handleModal = () => {
        setIsOpen((curState) => {
            return !curState;
        })
      };
  return (
    <section>

        <div>
        <h3 className="font-bold text-lg">Add New Players</h3>
        <button className="bg-gray-400 p-5 rounded-md text-white cursor-pointer" onClick={handleModal}>
        Add New
      </button>

      
        { isOpen && 
          <div className={isOpen ? (
            
            "modal-open" ):( "modal"
            )
            }>
         <div>
        <form onSubmit={handleSubmit}>
        <div className="form-control w-full">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered outline-none border-b"
                placeholder="Name"
              />
            </div>
            <div className="form-control w-full">
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="input input-bordered outline-none border-b"
                placeholder="Number"
              />
            </div>
            <div className="form-control w-full">
              <select
                className="select select-bordered"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option
                className="w-full outline-none"
                value="" disabled>
                  Select a Team
                </option>
                {teams.map((team) => (
                  <option value={team.id} key={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
              className="mr-3 p-2 bg-orange-200"
              type="submit" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" 
                className="p-2 bg-green-500">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>


        </form>
        </div>
        </div>
            }
    
     
        </div>
    </section>
  )
}

export default AddPlayers



// {/* Open the modal using ID.showModal() method */}
// <button className="btn" onClick={()=>window.my_modal_1.showModal()}>open modal</button>
// <dialog id="my_modal_1" className="modal">
//   <form method="dialog" className="modal-box">
//     <h3 className="font-bold text-lg">Hello!</h3>
//     <p className="py-4">Press ESC key or click the button below to close</p>
//     <div className="modal-action">
//       {/* if there is a button in form, it will close the modal */}
//       <button className="btn">Close</button>
//     </div>
//   </form>
// </dialog>