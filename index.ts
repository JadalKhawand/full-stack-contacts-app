import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { PrismaClient } from "@prisma/client";
const app = express();

const prisma = new PrismaClient();

dotenv.config();

const PORT = process.env.PORT;
app.use(cors)
app.use(express.json());

app.use(express.static('public'))

app.get("/ready", (req, res) => {
  res.json({error: '', msg: 'working'});
});

app.post("/api/users/create", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      throw Error("request error");
    }
    const user = await prisma.user.create({
      // @ts-ignore
      data: {
        name: name,
        email: email,
      },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/contacts/create", async (req, res) => {
  try {
    const { name, mobile, ownerId } = req.body;
    if (!name || !mobile || !ownerId) {
      throw Error("Request missing data");
    }
    const contact = await prisma.contact.create({
      data: {
        name: name,
        mobile: mobile,
        ownerId: ownerId,
      },
    });
    res.json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: '', msg: 'working'});
  }
});
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.json({error: '', msg: 'working'});
  }
});
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.json({error: '', msg: 'working'});
  }
});

app.get('/api/user/:user_id',async (req,res) => {
  try {
    const user_id = req.params.user_id;
    if(!user_id){
      throw Error ("User ID param empty")
    }
    const user = await prisma.user.findUnique({
      where: {
        id : parseInt(user_id),
      },
      include: {
        contacts: true
      }
    })
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(400).json({error: '', msg: 'working'})
  }
  
})



app.listen(PORT, () => {
  console.log("started server on port 5000");
});
