import { Meteor } from 'meteor/meteor';

// Server: Define a method that the client can call.
Meteor.methods({
  sendEmail(to, from, subject, html) {
    // Make sure that all arguments are strings.
    check([to, from, subject, html], [String]);
    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();
    Email.send({ to, from, subject, html:html });
  }
});