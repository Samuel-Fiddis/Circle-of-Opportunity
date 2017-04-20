export const Images = new FilesCollection({
  // Storage location on my personal OSX machine
  //    Need to update accordingly for OSX
  //storagePath: '/Users/coreygarvey/Documents/Imperial/COO/circle-of-opportunity/profile_pics',
  // Or set storagePath from root off project for linux
  // storagePath: '/public/images/profile_pics'
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

/*
if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
}
*/