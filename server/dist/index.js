"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001',
    methods: ['GET', 'PUT'],
    allowedHeaders: ['Content-Type'],
}));
app.get("/tasks", (req, res) => {
    const filePath = path_1.default.join(__dirname, 'tasks.json');
    fs_1.default.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tasks:', err);
            return res.status(500).send('Error reading tasks');
        }
        res.send(data);
    });
});
app.put("/editTasks", (req, res) => {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ message: 'No data provided' });
    }
    const jsonData = JSON.stringify(data, null, 2);
    // Write JSON string to file
    fs_1.default.writeFile('tasks.json', jsonData, (err) => {
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
