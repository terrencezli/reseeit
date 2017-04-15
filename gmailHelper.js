'use strict';

var async = require('async');
var base64url = require('base64url');
var cheerio = require('cheerio');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

// Load client secrets from a local file.
exports.retrieveMail = function(secretFile) {
  return new Promise(function (resolve, reject) {
    fs.readFile(secretFile, function processClientSecrets(err, content) {
      if (err) {
        reject(Error('Error loading client secret file: ' + err));
      }
      // Authorize a client with the loaded credentials, then call the
      // Gmail API.
      authorize(JSON.parse(content), listReceipts)
        .then(function (receipts) {
          resolve(receipts);
        });
    });
  });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  return new Promise(function (resolve, reject) {
    fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client)
          .then(function (receipts) {
            resolve(receipts);
          });
      }
    });
  });
  // Check if we have previously stored a token.
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listReceipts(auth) {
  var gmail = google.gmail('v1');

  return new Promise(function (resolve, reject) {

  gmail.users.messages.list({
    auth: auth,
    userId: 'me',
    labelIds: 'INBOX',
    q: 'subject: receipt'
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }

    var messages = response.messages;
    var messageIds = [];

    if (messages.length == 0) {
      console.log('No messages found.');
    } else {
      for (var i = 0; i < messages.length; i++) {
        messageIds.push(messages[i].id);
      }

      async.map(messageIds,
        function (messageId, callback) {

          gmail.users.messages.get({
            auth: auth,
            userId: 'me',
            id: messageId
          }, function (err, email) {
            if (err) {
              callback('Error retrieving email: ' + err);
            }

            // meta-data about email (date, subject, from, to, etc)
            // for (var i = 0; i < email.payload.headers.length; i++) {
            //   console.log(email.payload.headers[i])
            // }

            // Square emails have multiple parts
            // Part 1: Reply to this email to leave feedback for ReSeeIt
            // You paid $1.00 with your MasterCard ending in 4980 to ReSeeIt on Apr 12 2017 at 12:05 PM.

            // View your full receipt:
            // https://squareup.com/r/r16N1PTW4XB7ZMX

            // Your full receipt has more information about your payment to ReSeeIt.

            // https://squareup.com

            // Part 2: HTML
            var encodedString;
            var receiptObj = {};

            receiptObj['id'] = email.id;

            // use header to gather meta-data about email
            var headers = email.payload.headers;
            for (var i = 0; i < headers.length; i++) {
              var header = headers[i];
              if (header.name === 'Date') {
                receiptObj['date'] = header.value;
              }
              else if (header.name === 'From') {
                receiptObj['store'] = header.value;
              }
            }


            // Square data in parts
            if (email.payload.body.size === 0) {
              encodedString = email.payload.parts[1].body.data;
            }
            else {
              encodedString = email.payload.body.data;
            }

            var htmlBody = base64url.decode(encodedString);
            receiptObj['original_receipt_email'] = htmlBody;
            var $ = cheerio.load(htmlBody);

            var elems = $('td').each(function () {

              // Talech style
              if ($(this).text().replace(/\s/g, '') == "Total") {

                receiptObj['total'] = $(this).next('td').next('td').text().replace(/\s/g, '');
              }
              // Square style
              if ($(this).children('div').text() == "Total") {
                // Gets total amount
                receiptObj['total'] = $(this).next('td').children('div').text();
              }
            });

            callback(null, receiptObj);

          });
        },
        function (err, results) {
          if (err) {
            // return err;
            reject(Error(err));
          }

          console.log('Retrieved all emails with RECEIPT as subject line');
          // return results;
          resolve(results);
        });
    }

  });

  })
}