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
import { dbUser } from "../sequelize";

@Controller("api/account")
export class AccountController {
  @Post("login")
  private async LoginUser(
    req: { body: { username: string; password: string } },
    res: Response
  ) {
    try {
      // Check if we have this username and password for any user in our database
      const existingUser = await dbUser.findOne({
        where: {
          username: req.body.username.toLowerCase(),
          password: req.body.password,
        },
      });
      if (!existingUser) {
        // Throw an error if the user is not found
        throw new Error("Incorrect login details");
      }

      // If the user is found return the user
      return res.json({
        status: true,
        message: `Login successful`,
        data: existingUser,
      });
    } catch (err) {
      // Handle all the errors that might occur by sending a failed message back to the user
      return res.json({
        status: false,
        message: `Unable to log you in : ${err.message}`,
        data: null,
      });
    }
  }

  @Post("register")
  private async RegisterUser(
    req: {
      params: { userType: string };
      body: {
        username: string;
        password: string;
        role: string;
        fullname: string;
      };
    },
    res: Response
  ) {
    try {
      // Check if the user entered the correct information
      if (
        !req.body.username ||
        typeof req.body.username != "string" ||
        req.body.username.length <= 3
      ) {
        throw new Error(`Usernames should have more than 3 characters.`);
      }
      if (
        !req.body.fullname ||
        typeof req.body.fullname != "string" ||
        req.body.fullname.length <= 3
      ) {
        throw new Error(`Full names should have more than 3 characters.`);
      }
      if (
        !req.body.password ||
        typeof req.body.password != "string" ||
        req.body.password.length <= 4
      ) {
        throw new Error(`Passwords should have more than 4 characters.`);
      }
      if (
        !req.body.role ||
        typeof req.body.role != "string" ||
        !["manager", "owner", "guest", "clerk"].includes(
          req.body.role.toLowerCase()
        )
      ) {
        throw new Error(
          `User roles can only be one of 'manager' | 'owner' | 'guest' | 'clerk'`
        );
      }

      // Check if the username is already taken
      const existingUser = await dbUser.findOne({
        where: {
          username: req.body.username.toLowerCase(),
        },
      });

      if (existingUser != null) {
        // Throw an error if the username is already taken
        throw new Error(
          `Username ${req.body.username.toLowerCase()} already exist.`
        );
      }

      // Now create the new user and save them to the database
      const newUser = await dbUser.create({
        username: req.body.username.toLowerCase(),
        password: req.body.password,
        role: req.body.role.toLowerCase(),
        fullname: req.body.fullname,
      });

      // Return the newly created user
      return res.json({
        status: true,
        message: `User created successfully`,
        data: newUser,
      });
    } catch (err) {
      // Handle all the errors that might occur by sending a failed message back to the user
      return res.json({
        status: false,
        message: `Unable to create your account : ${err.message}`,
        data: null,
      });
    }
  }
}
