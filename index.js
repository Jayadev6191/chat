var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var data = require('./lib/data');

var notifications = {};
var MAX_MESSAGES = 50;

var app = new express();
app.set('port',3000);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'/')));

app.get('/api/contacts',function(req,res) {
    res.json({
        success: true,
        contacts: Object.keys(data.contacts)
    });
});

app.get('/api/contacts/:id',function(req,res) {
    var contact = data.contacts[req.params.id];
    if (!contact) {
        res.status(404).json({
            success: false,
            error: 'No contact found with this id'
        });
    } else {
        res.json({
            success: true,
            contact: {
                id: req.params.id,
                name: contact.name,
                phone: contact.phone
            }
        });
    }
});

app.get('/api/contacts/:id/messages',function(req,res) {
    var contact = data.contacts[req.params.id];
    if (!contact) {
        res.status(404).json({
            success: false,
            error: 'No contact found with this id'
        });
    } else {
        res.json({
            success: true,
            messages: contact.messages
        });
    }
});

app.post('/api/contacts/:id/messages',function(req,res) {
	console.log(req.body);
    var contact = data.contacts[req.params.id];
    if (!contact) {
        res.status(404).json({
            success: false,
            error: 'No contact found with this id'
        });
    } else if (!req.body.content || typeof(req.body.content)!=='string') {
        res.status(400).json({
            success: false,
            error: 'The required request parameter content was not present or was not a string'
        });
    } else {
        console.log('Message sent to %s: %s',contact.name,req.body.content);

        var msg = {
            type: 'sent',
            content: req.body.content
        };
        contact.messages.push(msg);

        if (contact.messages.length > MAX_MESSAGES) {
            contact.messages.shift();
        }
        res.json({
            success: true,
            message: msg
        });
    }
});

function randomNotifier() {
    var contactIds = Object.keys(data.contacts);
    var contactId = contactIds[Math.floor(Math.random() * contactIds.length)];
    var contact = data.contacts[contactId];

    var message = data.newMessages[Math.floor(Math.random() * data.newMessages.length)];

    // console.log('Message recieved from %s: %s',contact.name,message);
    contact.messages.push({
        type: 'recv',
        content: message
    });

    if (contact.messages.length > MAX_MESSAGES) {
        contact.messages.shift();
    }
    notifications[contactId] = true;
    setTimeout(randomNotifier,Math.floor(Math.random() * (10000 - 1000) + 1000));
}
setTimeout(randomNotifier,Math.floor(Math.random() * (10000 - 1000) + 1000));

app.get('/api/notifications',function(req,res) {
    var n = notifications;
    notifications = {};
    res.json({
        success: true,
        notifications: n
    });
});

app.listen(app.get('port'),function() {
    console.log('Express server listening on port %d',app.get('port'));
});
