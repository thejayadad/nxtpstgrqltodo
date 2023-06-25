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

        <div className={isOpen ? (
            
            "modal modal-open" ):( "modal"
            )
            }>
        <div className="modal-box">
        { isOpen && 
        <form onSubmit={handleSubmit}>
        <div className="form-control w-full">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Name"
              />
            </div>
            <div className="form-control w-full">
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="input input-bordered"
                placeholder="Number"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">TEAM</label>
              <select
                className="select select-bordered"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option value="" disabled>
                  Select a Team
                </option>
                {teams.map((team) => (
                  <option value={team.id} key={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="submit" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>


        </form>
            }
        </div>
        </div>
        </div>
    </section>
  )
}

export default AddPlayers