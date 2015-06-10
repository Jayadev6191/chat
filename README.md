# Brocade Front-end engineer Candidate Project

##Objective
Build a simple messaging webapp using an existing REST API. You can use any tools, frameworks, or libraries that you like, but it must be an HTML-5 based application.

## Requirements

The basic requirements for the app are covered in the mockup below.

![User interface mockup](https://raw.githubusercontent.com/brocadeengquestions/frontendjs/master/mockup.png)

The key functional requirements are as follows

* Typing into the search field should filter the list of contacts such that only those whose name contains the search term should be shown.
* Clicking on a contact should bring up their message history and their details. The message history should update without user input as new messages arrive.
* When the user clicks the Send button, the message they typed should be added to the message history using the REST API, and shown in the message history, but only if the API call succeeds.
* When a new message is received for a contact that is not currently selected, a notification icon should appear next to their name (As in the case of Adam West in the mockup). 
* Once the user clicks on a contact, any notification icon next to their name should disappear.

A simple REST API that you must integrate with has been provided

* **GET /api/contacts**

  Lists out the ids of all contacts.
  
* **GET /api/contacts/{id}**

  Shows the details for a particular contact.
  
* **GET /api/contacts/{id}/messages**

  Shows the message history for a particular contact.
  
* **POST /api/contacts/{id}/messages**

  Allows the user to send a message to a contact. This API accepts a JSON object of the form { content: 'message' } as its POST data.
  
* **GET /api/notifications**

  Contains a list the ids of all contacts that have sent a message since the last time the API was called. This API should be polled every 5 seconds to allow the UI to show notifications and update message histories as new messages arrive.

## Deploying the web app

Instructions for getting the webapp working

1. Download this repo as a zip file and extract to your local file system
2. Download and install node.js and npm for your OS.
3. cd into the same directory as this README and run ```npm install```
4. Start the server by running ```node index.js```
5. navigate to http://localhost:3000 in your web browser

## Building your Web Application

Place any HTML, Javascript, and CSS files you create in the public folder. You can add/modify web files in the public folder while the server is running; just refresh the browser to see your changes.

Once you complete the task, please send the changes back to recruiter in a zip file (NOTE: Don't include the contents of the node_modules folder in the zip file - make sure your package.json includes all npm package dependancies so we can get your solution running by running ```npm install```).

