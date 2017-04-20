import { Meteor } from 'meteor/meteor';
import { Images } from '../image_upload/imageCollection.js';


Meteor.users.helpers({
  userImage() {
    console.log(this);
    return Images.findOne({_id: this.image});
  }
});