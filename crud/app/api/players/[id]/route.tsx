import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Player } from "@prisma/client";
const prisma = new PrismaClient();

export const PATCH = async (request: Request, {params}: {params: {id: string}}) =>{
    const body: Player = await request.json();
    const player = await prisma.player.update({
        where:{
            id: Number(params.id)
        },
        data:{
            name: body.name,
            number: body.number,
            teamId: body.teamId
        }
    });
    return NextResponse.json(player, {status: 200});
}

export const DELETE = async (request: Request, {params}: {params: {id: string}}) =>{
    const player = await prisma.player.delete({
        where:{
            id: Number(params.id)
        }
    });
    return NextResponse.json(player, {status: 200});
}