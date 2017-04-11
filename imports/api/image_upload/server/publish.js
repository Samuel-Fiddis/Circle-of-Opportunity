import { Images } from '/imports/api/image_upload/imageCollection.js'

Meteor.publish('files.images.all', function () {
  return Images.find().cursor;
});
