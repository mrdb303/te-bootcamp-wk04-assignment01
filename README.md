# Tech Educators Bootcamp Week 04 Assignment

## Build a Full Stack Application: Visitor Guestbook

### Task

Build a website with a functional visitors guestbook or comment form, that saves to a database and allows a conversation to occur.

<br>
<br>

### Requirements

- Create a page containing a form to leave a message and a list of all the messages that have been left.
- Style the form and the messages so they're easy to read on multiple kinds of device.
- Create an API POST route to accept the text from your message input form.
- Create a database to store the messages, and create a seed file to create the table.
- Create an API GET route to retrieve all the messages from the database.
- Fetch the messages from your API in the browser and display them on the page.
<br>

### Feedback from user stories

- User wants to visit the website and read the information on their phone or computer.
- User wants to be able to leave a message in the guestbook.
- User wants to be able to see all of the messages that have been left in the guestbook.
<br>


### Design notes, additions and changes

User stories were used to define the scope of the project.

The CSS code written will change the layout of the page depending on the screen resolution, through the use of media queries and layout scaling. 

DELETE, SELECT, UPDATE and CREATE SQL statements were used to query the backend database and perform the deletion and the writing of records(CRUD). In addition, ORDER BY was used to fetch data in the order of date and time that messages were left. This ensures that the last record saved will appear at the top of the list. This improves the user experience as the user does not need to scroll to the bottom of the page to see the message they have just recorded.

In addition to the specification, a feature was added to write the date and time that the post was left. This is displayed at the bottom of each post in a readable format for the UK. 

Delete and 'like' buttons added, using open source SVG icons.

Input to the guestbook form is trimmed to remove excess spacing.

Open source font used (Google font "Lato").

When hovering the mouse over the buttons , the colour of the background changes with a gradual transition.

Initially I intended to create an auto incrementing integer id field on the database as a primary key. However, the official documentation for sqlite discourages use of this approach and to use the built-in functionality of rowid which is more performant.
See [here](https://www.sqlite.org/autoinc.html).


<br>


### Stretch goals

The following stretch goals were implemented

- Add a delete button to each message, that sends a request to the server to delete the message.

- Add a like button to each message, that sends a separate request to the server to increment the likes on the message.



### Issues

Initially the 'like' and 'delete message' buttons were close to each other, which made it too easy to accidentally click the delete button instead of the like button. To resolve this, they were positioned at either end of each post, using flexbox to handle the layout.

I intended to submit the assignment on Saturday 23rd, but came across problems when uploading to the render.com service.
On the local node server, everything works perfectly. On the render.com service, it worked intermittently so I made extra tweaks to the code.
However, as of 20:58 on Christmas eve, everything seems to be working and I'm not going to make any more changes.

Line 6 on app.js allows toggling between render.com server and local server: 

```
isLive = true;  // Changes the script to set it to use the live render.com server.
isLive = false;  // Changes the script to set it to use the local server.
```