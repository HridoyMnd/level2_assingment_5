import { model, Schema } from "mongoose";
import { ITransaction, TStatus, TType } from "./transaction.interface";


//  transaction schema
const transactionSchmma = new Schema<ITransaction>({
    transaction_type: {type:String,  enum:Object.values(TType), required:true},
    amount: {type: Number, required:true},
    currency: {type:String, required:true, default:"BDT"},
    status: {type:String, enum: Object.values(TStatus), required:true},
    paymentMethod: {type: String},
    fromWallet: {type: Schema.Types.ObjectId, ref: "Wallet"},
    toWallet: {type: Schema.Types.ObjectId, ref: "Wallet"},
    initiatedBy: {type: Schema.Types.ObjectId, ref: "User", required:true},
    approvedBy: {type: Schema.Types.ObjectId, ref: "User"},
    userId: {type:String, required:true},
    transaction_fee: {type: Number, required:true, default: 0},
    balanceBefore: {type:Number}, 
    balanceAfter: {type: Number},
    deviceInfo: {type: String}

}, {
    timestamps:true, 
    versionKey:false
})


// transaction model 
export const Transaction = model<ITransaction>("Transaction", transactionSchmma);