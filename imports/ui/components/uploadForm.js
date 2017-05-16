import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Images } from '/imports/api/image_upload/imageCollection.js'

import './uploadForm.html';

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
  // Variable used to set the image path
  //  Value within hidden input field
  this.fileId = new ReactiveVar("No Image");
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  },
  // function to get the fileId variable in upload form
  fileId: function () {
    return Template.instance().fileId.get();
  },
});

Template.uploadForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          alert('File "' + fileObj.name + '" successfully uploaded');
        }
        // Reset upload file input
        //  Should be the name of the uploaded file
        //  upload.config.name
        template.currentUpload.set(false);
        // Set the variable 'fileId' to the image path 'fileName'
        //  'fileId' is the value in the hidden input 'image'
        console.log(upload);
        var fileId = upload.config.fileId;
        var fileExt = upload.config.fileData.extension;
        var fileName = fileId + "." + fileExt;
        template.fileId.set(fileId);
      });
      upload.start();
    }
  }
});