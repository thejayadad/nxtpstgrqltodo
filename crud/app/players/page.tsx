import React from 'react'
import { BsFillPencilFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { PrismaClient } from "@prisma/client";
import AddPlayers from './addPlayers';
import DeletePlayer from './deletePlayer';
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
  
const getTeams = async () => {
    const res = await prisma.team.findMany();
    return res;
  };
  


const Players = async () => {
    const [players, teams] = await Promise.all([getPlayers(), getTeams()]);
    return (
    <section className='max-w-screen-lg mx-auto mt-10 p-4'>
        <h2 className='text-center text-5xl'>Players Database</h2>
        <div>
            <AddPlayers teams={teams} />
        </div>
        <div>
        <table className="table border-separate space-y-6 text-sm w-full mx-auto">
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
              <DeletePlayer player={player} />
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