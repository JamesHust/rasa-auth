import { Document } from "mongoose";

export interface Bot extends Document {
    readonly name: string;
    readonly author: string;
    readonly createdAt: Date;
}