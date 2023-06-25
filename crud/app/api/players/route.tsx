import { NextResponse } from "next/server";
import type { Player} from "@prisma/client";
import { prisma } from "@/lib/db";


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