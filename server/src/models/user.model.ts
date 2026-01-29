import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { IUser } from "../types/user.types";


const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Invalid Email Address",
      },
    },
    password: { type: String, required: true, select: false, minLength: 8 },
  },
  {
    timestamps: true,
  },
);

//Instance Methods

//This hook works between when we ge the data and when its persisted to db
userSchema.pre("save", async function ( ) {
  if (!this.isModified("password")) return ;

  this.password = await bcrypt.hash(this.password, 10);

 ;
});

//Instance method to compare passwords
userSchema.methods.correctPassword = async function (
  this: IUser,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
