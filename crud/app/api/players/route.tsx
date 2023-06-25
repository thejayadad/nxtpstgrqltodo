import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Player} from "@prisma/client";
const prisma = new PrismaClient();


export const POST = async (request: Request) =>{
    const body: Player = await request.json();
    const player = await prisma.player.create({
        data:{
            name: body.name,
            number: body.number,
            teamId: body.teamId
        }
    });
    return NextResponse.json(player, {status: 201});
}