/**
 * Example controller
 *
 * created by Sean Maxwell Apr 14, 2019
 */
import { Request, Response } from "express";
import {
  Controller,
  Middleware,
  Get,
  Put,
  Post,
  Delete,
} from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { dbRoom } from "../sequelize";

@Controller("api/room")
export class RoomController {
  @Post("create")
  private async Create(
    req: {
      body: {
        name: string;
        pricePerNight: number;
        ownerId: number;
        managerId: number;
      };
    },
    res: Response
  ) {
    try {
      // Validate if the user provided a name and price per night of the room
      if (!req.body.name) {
        throw new Error(`A room name is required`);
      }
      if (!req.body.pricePerNight) {
        throw new Error(`A price per night of the room is required`);
      }
      // Check if the room name already exists
      const existingRoom = await dbRoom.findOne({
        where: {
          name: req.body.name.toLowerCase(),
        },
      });
      if (existingRoom) {
        throw new Error(`The room name ${req.body.name} is already taken`);
      }
      const newRoom = await dbRoom.create({
        name: req.body.name.toLowerCase(),
        pricePerNight: req.body.pricePerNight,
        managerId: req.body.managerId,
        ownerId: req.body.ownerId,
      });

      return res.json({
        status: true,
        message: `Room successfully created`,
        data: newRoom,
      });
    } catch (err) {
      return res.json({
        status: false,
        message: `Unable to create room : ${err.message}`,
        data: null,
      });
    }
  }

  @Post("update")
  private async Update(
    req: { body: { id: number; name: string; pricePerNight: number } },
    res: Response
  ) {
    try {
      // Validate if the user provided a name and price per night of the room
      if (!req.body.name) {
        throw new Error(`A room name is required`);
      }
      if (!req.body.pricePerNight) {
        throw new Error(`A price per night of the room is required`);
      }
      // Check if the room name already exists
      const existingRoom = await dbRoom.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (!existingRoom) {
        throw new Error(`The room does not exist`);
      }
      existingRoom.set("name", req.body.name.toLowerCase());
      existingRoom.set("pricePerNight", req.body.pricePerNight);
      await existingRoom.save();

      return res.json({
        status: true,
        message: `Room successfully updated`,
        data: existingRoom,
      });
    } catch (err) {
      return res.json({
        status: false,
        message: `Unable to create room : ${err.message}`,
        data: null,
      });
    }
  }

  @Post("delete")
  private async Delete(req: { body: { roomId: number } }, res: Response) {
    try {
      // Validate if the user provided a name and price per night of the room
      if (!req.body.roomId) {
        throw new Error(`A room id is required`);
      }
      // Check if the room name already exists
      const existingRoom = await dbRoom.findOne({
        where: {
          id: req.body.roomId,
        },
      });
      if (existingRoom) {
        existingRoom.destroy();
      }
      return res.json({
        status: true,
        message: `Room successfully deleted`,
        data: existingRoom,
      });
    } catch (err) {
      return res.json({
        status: false,
        message: `Unable to delete room : ${err.message}`,
        data: null,
      });
    }
  }

  @Get("get/rooms/by/ownerid/:ownerId")
  private async GetRoomsByOwnerId(
    req: { params: { ownerId: string } },
    res: Response
  ) {
    try {
      const rooms = await dbRoom.findAll({
        where: {
          ownerId: req.params.ownerId,
        },
      });

      if (!rooms) {
        throw new Error(`Can not find rooms of the provided user.`);
      }

      return res.json({
        status: true,
        message: `We got ${rooms.length} rooms`,
        data: rooms,
      });
    } catch (err) {
      return res.json({
        status: false,
        message: `Unable to get rooms by owner id : ${err.message}`,
        data: null,
      });
    }
  }
}
