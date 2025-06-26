import type { NextFunction,Request,Response } from "express";

//Prisma
import type { PrismaClient } from "@/generated/prisma/index.js";
import getPrismaInstance from "@/utils/prisma-client.js";

// Error Classes
import { DatabaseError,UnauthorizedError,ValidationError } from "@/utils/errors.js";

export const UpdateUserProfile=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,fullName,description,profileImage}=req.body

        if(!email){
            throw new ValidationError("Email id is required in order to proceed")
        }

        const prisma=getPrismaInstance() as PrismaClient

        if(!prisma){
            throw new DatabaseError("Unable to connect to database")
        }

        const existingUser=await prisma.user.findUnique({
            where:{email}
        })

        if(!existingUser){
            throw new UnauthorizedError("Given user not exits")
        }

        const updateData:any = {}

        if(fullName!==undefined) updateData.fullName=fullName
        if(description!==undefined) updateData.description=description
        if(profileImage!==undefined) updateData.profileImage=profileImage

          // Mark profile as complete if fullName is provided
        if (fullName && !existingUser.isProfileInfoSet) {
            updateData.isProfileInfoSet = true;
        }

       const updatedUser = await prisma.user.update({
            where: { email },
            data: updateData
        });

        res.status(200).json({
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
                fullName: updatedUser.fullName,
                description: updatedUser.description,
                profileImage: updatedUser.profileImage,
                isProfileInfoSet: updatedUser.isProfileInfoSet,
            },
            message: `Profile updated successfully for ${updatedUser.fullName || updatedUser.username}`
        });
        
    }catch(error){
        next(error)
    }
}