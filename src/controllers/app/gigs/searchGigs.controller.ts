import { getPrismaInstance } from "@/utils/prisma-client";
import type { NextFunction, Request, Response } from "express";

const createSearchQuery = (searchTerm?: string, category?: string) => {
  const query: any = {
    where: {
      OR: [],
    },
    include: {
      createdBy: true,
    },
  };
  if (searchTerm) {
    query.where.OR.push({
      title: { contains: searchTerm, mode: "insensitive" },
    });
  }
  if (category) {
    query.where.OR.push({
      category: { contains: category, mode: "insensitive" },
    });
  }
  return query;
};


export const searchGigs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
        if(req.query.searchTerm || req.query.category){
            const prisma=getPrismaInstance()
            const gigs=await prisma.gigs.findMany(
                createSearchQuery(req.query.searchTerm as string,req.query.category as string)
            )
                        
            res.status(200).json({gigs})
        } else {
            res.status(400).send("Search term or category are required")
        }
  } catch (error) {
    next(error);
  }
};
