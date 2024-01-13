"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const PORT = process.env.PORT;
app.use(cors_1.default);
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.get("/ready", (req, res) => {
    res.json({ error: '', msg: 'working' });
});
app.post("/api/users/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            throw Error("request error");
        }
        const user = yield prisma.user.create({
            // @ts-ignore
            data: {
                name: name,
                email: email,
            },
        });
        res.json(user);
    }
    catch (err) {
        console.log(err);
    }
}));
app.post("/api/contacts/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, mobile, ownerId } = req.body;
        if (!name || !mobile || !ownerId) {
            throw Error("Request missing data");
        }
        const contact = yield prisma.contact.create({
            data: {
                name: name,
                mobile: mobile,
                ownerId: ownerId,
            },
        });
        res.json(contact);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: '', msg: 'working' });
    }
}));
app.get("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        console.log(error);
        res.json({ error: '', msg: 'working' });
    }
}));
app.get("/api/contacts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield prisma.contact.findMany();
        res.json(contacts);
    }
    catch (error) {
        console.log(error);
        res.json({ error: '', msg: 'working' });
    }
}));
app.get('/api/user/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.user_id;
        if (!user_id) {
            throw Error("User ID param empty");
        }
        const user = yield prisma.user.findUnique({
            where: {
                id: parseInt(user_id),
            },
            include: {
                contacts: true
            }
        });
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: '', msg: 'working' });
    }
}));
app.listen(PORT, () => {
    console.log("started server on port 5000");
});
