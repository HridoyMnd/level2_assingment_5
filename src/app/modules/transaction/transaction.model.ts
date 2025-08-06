import { model, Schema } from "mongoose";
import { ITransaction, TStatus, TType } from "./transaction.interface";


//  transaction schema
const transactionSchmma = new Schema<ITransaction>({
    transaction_type: {type:String,  enum:Object.values(TType), required:true},
    amount: {type: Number, required:true},
    currency: {type:String, default:"BDT"},
    status: {type:String, enum: Object.values(TStatus), default:TStatus.PENDING},
    paymentMethod: {type: String},
    fromWallet: {type: Schema.Types.ObjectId, ref: "Wallet", required:true},
    toWallet: {type: Schema.Types.ObjectId, ref: "Wallet", required:true},
    initiatedBy: {type: Schema.Types.ObjectId, ref: "User", required:true},
    approvedBy: {type: Schema.Types.ObjectId, ref: "User"},
    userId: {type:String, required:true},
    transaction_fee: {type: Number, default: 0},
    balanceBefore: {type:Number}, 
    balanceAfter: {type: Number},
    deviceInfo: {type: String}

}, {
    timestamps:true, 
    versionKey:false
})


// transaction model 
export const Transaction = model<ITransaction>("Transaction", transactionSchmma);