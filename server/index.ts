import { firestore,rtdb } from "./db";
import * as path from "path"
import { nanoid } from "nanoid";

import * as express from "express"


const cors = require("cors")

const app = express()

const port = process.env.PORT || 3003

const userCollection = firestore.collection("users")
const roomsCollection = firestore.collection("rooms")
app.use(express.json())
app.use(express.static("dist"))
app.use(cors())


app.post("/signup",(req,res)=>{
  
  const {nombre} =req.body

  userCollection.where("nombre","==",nombre).get().then((response)=>{
    if(response.empty){
      userCollection.add({
        
        nombre
      }).then((newUserRef)=>{
        res.json({
          message:"User created",
          id:newUserRef.id,
          new:true
        })
      })
    }else{
      res.status(400).json("user already exists")
    }
  })
})

app.post("/signin",(req,res)=>{
  const {nombre}=req.body
  userCollection.where("nombre","==",nombre).get().then((response)=>{
    if(response.empty){
      console.error("No estas registrado")
    }else{
      res.json({
        id:response.docs[0].id
      })
    }
  })
})

app.post("/rooms",(req,res)=>{
  const {userId} =req.body

  userCollection.doc(userId).get().then((doc)=>{
    if(doc.exists){
      const roomRef = rtdb.ref("rooms/"+nanoid())
      roomRef.set({
        currentGame:{
          user1:{
            name:"",
            userId:"",
            choice:"",
            online:false,
            start:false
          },
          user2:{
            name:"",
            userId:"",
            choice:"",
            online:false,
            start:false

          }
        },
        owner:userId
      }).then(()=>{
        const longIdRoom = roomRef.key
        const roomId = 1000 + Math.floor(Math.random()*999)
       roomsCollection.doc(roomId.toString()).set({
         rtdbRoomId:longIdRoom,
         history:{
           user1:0,
           user2:0
         }
       }).then(()=>{
         res.json({
           id:roomId.toString()
         })
       })
      })
    }else{
      res.status(400).json({
        message:"room no existing"
      })
    }
  })
  
  
})

app.get("/rooms/:roomId",(req,res)=>{
  const {userId} = req.query
  const {roomId} = req.params

  userCollection.doc(userId.toString()).get().then((doc)=>{
    if(doc.exists){
      roomsCollection.doc(roomId).get().then((snap)=>{
        if(snap.exists){
          const data = snap.data()
          res.json(data)
        }
      })
    }else {
      res.status(400).json({
        message:"room no existing"
      })
    }
  })
})
app.post("/messages/:roomId",(req,res)=>{
  const {roomId} = req.params
  const chatRoomsRed = rtdb.ref(`/rooms/${roomId}/messages`)
  chatRoomsRed.push(req.body,()=>{
    res.json({
      message:"Todo bien"
    })
  })
})
app.get("/env",(req,res)=>{
  res.json({
    environment:process.env.NODE_ENV
  })
})

app.get("*",(req,res)=>{
  const pathResolve = path.resolve("","dist/index.html")
  res.sendFile(pathResolve)

})


app.listen(port,()=>{
  console.log(`service active http://localhost:${port}` )
 
  
})