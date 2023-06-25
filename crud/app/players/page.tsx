import React from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getPlayers = async () => {
    const res = await prisma.player.findMany({
      select: {
        id: true,
        name: true,
        number: true,
        teamId: true,
        team: true,
      },
    });
    return res;
  };


const Players = async () => {
    const players = await getPlayers();
  return (
    <section>
        <h2>Players Database</h2>
        <div>
            Add Players
        </div>
        <div>
        <table className="table border-separate space-y-6 text-sm w-6/12 mx-auto">
        <thead className="bg-blue-500 text-white">
          <tr> 
            <th className="p-3 text-center">Name</th>
            <th className="p-3 text-center">Number</th>
          
            <th className="p-3 text-center">Team</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {players.map((player, index) => (

        <tr key={player.id} className="bg-blue-200">
            <td className="p-3 font-medium capitalize text-center">{player.name}</td>
            <td className="text-center">{player.number}</td>
            <td className="p-3 text-center uppercase">{player.team.name}</td>
             <td className="p-3 flex justify-center">
              <button className="text-yellow-600 hover:text-yellow-300 mx-2">
              <BsFillPencilFill style={{fontSize: "24px"}} />
              </button>
              <button
                className="text-red-600 hover:text-red-300 ml-2"
              >
              <AiFillDelete style={{fontSize: "24px"}} />
              </button>
            </td>
          </tr>
            ))}
        </tbody>
        </table>
        </div>
    </section>
  )
}

export default Players