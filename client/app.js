const form = document.getElementById("guestbookform");
const fetchAddressUrl = 'https://te-bootcamp-wk04-guestbook-serv.onrender.com/guestbook';
// http://localhost:8080/guestbook



// Ensures the removal of existing entries. This needs to be done to
// stop messages appearing twice on a submit, when messages are 
// already displayed.
const clearGuestbookMessageContainer = () => {
  document.querySelector('footer').style.display = "none";
  const existingMessages = document.getElementById("guestbookContainer");
  existingMessages.innerHTML = '';
};


const combineHTMLElementsPerMessageInstance = (messageEntry) =>{
  const h3 = document.createElement("h3");
  h3.textContent = messageEntry.username;

  const p = document.createElement("p");
  p.textContent = messageEntry.message;

  const likes = document.createElement("p");
  likes.textContent = "Likes: " + messageEntry.likes;

  const dateTime = document.createElement("p");
  const id = messageEntry.rowid;
  
  dateTime.textContent = convertISOString(messageEntry.visit);
  buildMessageInstance(h3, p, likes, dateTime, id);
};


const buildMessageInstance = (username, message, likes, dateTime, id) => {
  const guestbookContainer = document.getElementById("guestbookContainer");

  let messageWrap = document.createElement("div");
  messageWrap.className = "message-instance";
  
  messageWrap.appendChild(username);
  let content = wrapMessageContent(message);
  messageWrap = appendMultipleChildren(messageWrap, [content, dateTime, likes]);
  
  const buttonWrap = setButtonWrapper(id);
  messageWrap.appendChild(buttonWrap);
  guestbookContainer.appendChild(messageWrap);
};



const appendMultipleChildren = (obj, arr) => {
  arr.forEach(function (childEntry) {
    obj.appendChild(childEntry)});
  return obj;
};


// For generating like and delete buttons
const getButton = (id, classOfButton) => {
  const button = document.createElement("button");
  button.className = classOfButton;
  button.setAttribute('data-id' , id);
  return button;
};


// SQLite doesn't have a DateTime type field property, so requires date and time
// to be saved as text in an ISO format.
const convertISOString = (dateVal) => {
  const p = dateVal.split(/\D+/);
  const dateConv = new Date(Date.UTC(p[0], --p[1], p[2], p[3], p[4], p[5], p[6]));
  return convertDateToText(dateConv);
};


// For the output of the date the message instance was created.
const convertDateToText = (dateVal) => {
  const year = dateVal.getFullYear();
  const month = dateVal.getMonth();
  const day = dateVal.getDate();
  const hours = dateVal.getHours();
  
  let mins = dateVal.getMinutes();
  if(mins < 10) mins += "0";

  return (`Posted: ${day}/${month}/${year} - ${hours}:${mins}`);
};


const wrapMessageContent = (content) =>{
  const wrapped = document.createElement("div");
  wrapped.className = "message-content";
  wrapped.appendChild(content);
  return wrapped;
};


// Buttons placed in a div wrapper so that flexbox can be used
// to put the two buttons at either side of the page.
const setButtonWrapper = (id) => {
  const wholeDiv = document.createElement("div");
  wholeDiv.className = "button-wrapper";
  const likeButton = getButton(id, "like-button");
  const delButton = getButton(id, "delete-button");

  wholeDiv.appendChild(likeButton);
  wholeDiv.appendChild(delButton);
  return wholeDiv;
};


const setListenersForLikeButtons = async () => {
  const likeButtons = document.getElementsByClassName('like-button');

  for(let counter=0;counter < likeButtons.length;counter++){
    likeButtons[counter].addEventListener("click", sendGiveAThumbsUp);
  }
}


 const setListenersForDeleteButtons = async () =>{
  const deleteButtons = document.getElementsByClassName('delete-button');

  for(let counter=0;counter < deleteButtons.length;counter++){
    deleteButtons[counter].addEventListener("click", sendDeleteRequest);
  }
}


async function sendGiveAThumbsUp() {
  clearGuestbookMessageContainer();
  let attr = this.getAttribute("data-id"); // rowid value from sqlite3
  
  const obj = {username: "", message: "", id: attr, action: "like"};

  const response = await fetch(fetchAddressUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const json = await response.json();
}



// Start point:

clearGuestbookMessageContainer();
getGuestbook();


form.addEventListener("submit", async function (event) {
  event.preventDefault();
  clearGuestbookMessageContainer();

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  const response = await fetch(fetchAddressUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  const json = await response.json();
});



async function sendDeleteRequest(){
  clearGuestbookMessageContainer();
  let attr = this.getAttribute("data-id"); // rowid value from sqlite3
  
  const obj = {username: "", message: "", id: attr, action: "delete"};

  const response = await fetch(fetchAddressUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const json = await response.json();
}


// get the guest posts from the Database
async function getGuestbook() {
  const response = await fetch(fetchAddressUrl);
  const allEntries = await response.json();

  allEntries.forEach(function (messageEntry) {
    combineHTMLElementsPerMessageInstance(messageEntry);
  });

  // Now we have all of the messages and buttons on the page, we can set
  // the event listeners for those newly created buttons.
  document.querySelector('footer').style.display = "block";
  setListenersForLikeButtons();
  setListenersForDeleteButtons();
}