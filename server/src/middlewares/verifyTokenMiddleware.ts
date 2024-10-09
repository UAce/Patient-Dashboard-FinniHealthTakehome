import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import Logger from "../common/logger";

const logger = Logger.getInstance({ name: "VerifyToken" });

export const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    res.status(401).send("Missing authentication token");
  } else {
    try {
      logger.info("Decoding token");

      const decodedToken = await admin.auth().verifyIdToken(token);

      (req as any).user = {
        // Attach user data to request object
        providerId: decodedToken.uid,
      };
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).send("Invalid authentication token");
    }
  }
};
