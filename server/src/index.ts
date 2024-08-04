import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fs from 'fs'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'PUT'],
    allowedHeaders: ['Content-Type'],
}));

app.get("/tasks", (req: Request, res: Response) => {
    const filePath = path.join(__dirname, 'tasks.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tasks:', err);
            return res.status(500).send('Error reading tasks');
        }

        res.send(data);
    });
});

app.put("/editTasks", (req: Request, res: Response) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'No data provided' });
    }

    const jsonData = JSON.stringify(data, null, 2);

    // Write JSON string to file
    fs.writeFile('tasks.json', jsonData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).json({ message: 'Failed to write to file' });
        }

        res.status(200).json({ message: 'Data written to file successfully' });
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});