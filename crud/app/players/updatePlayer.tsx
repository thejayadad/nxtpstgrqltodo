"use client";
import { useState, SyntheticEvent } from "react";
import type { Team } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type Player = {
    id: number;
    name: string;
    number: number;
    teamId: number;
  };

  const UpdatePlayer = ({
    teams,
    player,
  }: {
    teams: Team[];
    player: Player;
  }) => {
    const [name, setName] = useState(player.name);
    const [number, setNumber] = useState(player.number);
    const [team, setTeam] = useState(player.teamId);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const router = useRouter();
  
    const handleUpdate = async (e: SyntheticEvent) => {
      e.preventDefault();
      setIsLoading(true);
      await axios.patch(`/api/players/${player.id}`, {
        name: name,
        number: Number(number),
        teamId: Number(team),
      });
      setIsLoading(false);
      router.refresh();
      setIsOpen(false);
    };
  
    const handleModal = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div>
        <button className="btn btn-info btn-sm" onClick={handleModal}>
          Edit
        </button>
  
        <div className={isOpen ? "modal modal-open" : "modal"}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update {player.name}</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control w-full">
                <label className="label font-bold">Player Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered"
                  placeholder="PlayerName"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-bold">Price</label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(Number(e.target.value))}
                  className="input input-bordered"
                  placeholder="Number"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-bold">Team</label>
                <select
                  value={team}
                  onChange={(e) => setTeam(Number(e.target.value))}
                  className="select select-bordered"
                >
                  {teams.map((team) => (
                    <option value={team.id} key={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={handleModal}>
                  Close
                </button>
                {!isLoading ? (
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                ) : (
                  <button type="button" className="btn loading">
                    Updating...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default UpdatePlayer;
  