import { ITransaction } from "./transaction.interface"
import { Transaction } from "./transaction.model";


// create transaction
const createTransactionS = async (payload:Partial<ITransaction>)=> {
    await Transaction.create(payload)

}

// get all transaction
const getAllTransactionS = async () => {
  const transactions = await Transaction.find({});
  const totalTransactoin = await Transaction.countDocuments();
  return {
    data: transactions,
    meta: {
      total: totalTransactoin,
    },
  };
};



// transaction service controller
export const transactionServiceController = {
    createTransactionS,
    getAllTransactionS
}