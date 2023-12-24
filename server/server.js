

import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
const db = new Database("database.db");

const app = express();
app.use(express.json());
app.use(cors());



// Message for those that try to view the server
app.get("/", function (request, response) {
  response.json("Hey, who sent you here!");
});


// Entry via GET returns all messages
// It is recommended in the SQLite documentation to use the built-in rowid 
// field property instead of creating an auto incrementing integer as 
// an id/primary key.
// Results returned in descending order so that the last guestbook post is
// displayed at the top in date order.
app.get("/guestbook", function (request, response) {
  const guestbook = db.prepare("SELECT rowid, * FROM guestbook ORDER BY visit DESC").all();
  response.json(guestbook);
});


// Entry via POST - post a message, trigger increaseLikes or deleteMessage
// depending on which button is clicked - then return all messages
app.post("/guestbook", function (request, response) {
  if(request.body.action != null){
    if(request.body.action === "like") increaseLikes(request.body.id);
    if(request.body.action === "delete") deleteMessage(request.body.id);
  } else {
    insertANewMessage(request.body.username, request.body.message);
  }

  const guestbook = db.prepare("SELECT rowid, * FROM guestbook ORDER BY visit DESC").all();
  response.json(guestbook);
});



// To insert a new message along with a likes value of zero and an ISO
// formatted date string of the current date and time. Trims too.
function insertANewMessage(username, message){
  const dateTime = new Date();
  const sqliteDate = dateTime.toISOString();
  
  username = username.trim();
  message = message.trim();

  db.prepare(`INSERT INTO guestbook (username, message, visit, likes) 
    VALUES (?, ?, ?, 0)`)
    .run(username, message, sqliteDate);
}


function increaseLikes(idNum){
  const change =
    db.prepare(`UPDATE guestbook SET likes = likes + 1 WHERE rowid = ?`)
      .run(idNum);
}


function deleteMessage(idNum){
  const change =
    db.prepare(`DELETE FROM guestbook WHERE rowid = ?`)
      .run(idNum);
}


app.listen(8080, function () {
  console.log("IT'S WORKING!");
});
