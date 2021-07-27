import express, {Request} from "express";
import bodyParser from "body-parser";
import * as uuid from "uuid";
import { TransactionDb } from "./transaction-db";

export interface CreateTransactionDto {
    asset: string;
    amount: number;
    destinationAddress: string;
}

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post("/transaction", (req: Request<any, any, CreateTransactionDto>, res) => {
    const {body} = req;
    const {destinationAddress, amount, asset} = body;
    const userId = req.header("user-id");
    if (!userId) {
        res.status(401).json({
            message: "Unauthorized"
        });
    } else {
        console.log(`userId ${userId}. Received a request with body ${JSON.stringify(body)}`);
        const txId = uuid.v4();
        TransactionDb.saveTransaction({
            id: txId,
            asset,
            amount,
            destinationAddress,
            userId: userId
        });
        res.status(201).json({id: txId});
    }
});

app.get("/transaction/:id", (req, res) => {
    const {id} = req.params;
    const userId = req.header("user-id");
    if (!userId) {
        res.status(401).json({
            message: "Unauthorized"
        });
    } else {
        console.log(`userId ${userId}. Received a request to get a transaction by id ${id}`);
        const tx = TransactionDb.getTransactionById(userId, id);
        if (!tx) {
            console.error(`userId ${userId}. No tx is found with id ${id}`);
            res.status(400).json({
                message: `Transaction is not found with id ${id}`
            });
        } else {
            console.log(`Returning tx to user: ${JSON.stringify(tx)}`);
            res.json({...tx, userId: undefined});
        }
    }
});

app.get("/", (req, res) => {
    res.send("OK");
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
