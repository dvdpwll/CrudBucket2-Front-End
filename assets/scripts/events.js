'use strict';

const getFormFields = require('../../lib/get-form-fields');
const app = require('./app');
const api = require('./api');
const ui = require('./ui');

// after sign up create the root folder
const createRootFolder = function (data) {
  let folderData = {
    folder: {
      name: `${data.user.email}Root`,
      path: `,${data.user._id}`,
      _owner: data.user._id,
    },
  };

  // send data
  api.createRootFolder(folderData)
    .done(ui.success)
    .fail(ui.onError);
};

// sign up a new user
const onSignUp = function (event) {
  let data = getFormFields(event.target); //convert this to target text field
  event.preventDefault(); //wont need this when I get rid of submit button

  //send form data
  api.signUp(data)
      .done(createRootFolder)
      .fail(ui.failure);

  $('#sign-up').modal('hide');
};

// display user folders
const displayUserFolder = function(data){
  //make createdat and updatedat look better
  for (let i = 0; i < data.folders.length; i++) {
    //split date-time string into date and timef
    let strSplitC = data.folders[i].createdAt.split('T');
    let strSplitU = data.folders[i].updatedAt.split('T');

    //put only date into data
    data.folders[i].createdAt = strSplitC[0];
    data.folders[i].updatedAt = strSplitU[0];
  }

  //handlebars
  let userFolderTemplate = require('./templates/current-user-folders.handlebars');
    $('#main-content').html(userFolderTemplate({
      folders: data.folders
    }));
};

// display user files
const displayUserFile = function(data){
  //make createdat and updatedat look better
  for (let i = 0; i < data.files.length; i++) {
    //split date-time string into date and timef
    let strSplitC = data.files[i].createdAt.split('T');
    let strSplitU = data.files[i].updatedAt.split('T');

    //put only date into data
    data.files[i].createdAt = strSplitC[0];
    data.files[i].updatedAt = strSplitU[0];
  }

  //handlebars
  let userFileTemplate = require('./templates/current-user-files.handlebars');
    $('#main-content').append(userFileTemplate({
      files: data.files
    }));
};

// after getRootFolder get the contents of root
const getRootContents = function (data) {
  //update current folder path
  app.currentPath = `${app.currentPath},${data.folders[0]._id}`;

  // get current path to show contents of root
  let search = app.currentPath;

  // send data to folders
  api.showRootFolder(search)
    .done(displayUserFolder)
    .fail(ui.onError);

  // send data to files
  api.showRootFiles(search)
    .done(displayUserFile)
    .fail(ui.onError);
};

// after sign in, get the root folder
const getRootFolder = function (data) {
  //save token
  app.user = data.user;

  //update current folder path
  app.currentPath = `,${data.user._id}`;

  // get current path to open root
  let search = app.currentPath;

  // send data
  api.showRootFolder(search)
    .done(getRootContents)
    .fail(ui.onError);
};

// display all the users
const displayUsers = function(data){
  //handlebars
  let userTemplate = require('./templates/user.handlebars');
  $('.sidebar-nav').html(userTemplate({
      users: data.users,
    }));
};

// get all users
const onGetUsers = function () {
  //send index
  api.getUsers()
    .done(displayUsers)
    .fail(ui.onError);
};

// sign in a user
const onSignIn = function (event) {
  let data = getFormFields(this); //convert this to target text field
  event.preventDefault(); //wont need this when I get rid of submit button

  // send form data
  api.signIn(data)
      .done(getRootFolder)
      .done(onGetUsers)
      .done(ui.signInSuccess)
      .fail(ui.failure);

  $('#sign-in').modal('hide');
};

// change the users password
const onChangePassword = (event) => {
  let data = getFormFields(event.target); //convert this to target text field
  event.preventDefault(); //wont need this when I get rid of submit button

  // send form data
  api.changePassword(data)
      .done(ui.success)
      .fail(ui.failure);

  $('#change-password').modal('hide');
};

// sign out the user
const OnSignOut = function (event) {
  event.preventDefault(); //wont need this when I get rid of submit button

  api.signOut()
      .done(ui.signOutSuccess)
      .fail(ui.failure);
};

// add folder to UI
const addOneFolder = (data) => {
  //split date-time string into date and timef
  let strSplitC = data.folder.createdAt.split('T');
  let strSplitU = data.folder.updatedAt.split('T');

  //put only date into data
  data.folder.createdAt = strSplitC[0];
  data.folder.updatedAt = strSplitU[0];


  //handlebars
  let userFolderTemplate = require('./templates/current-user-folder.handlebars');
    $('#main-content').append(userFolderTemplate({
      name:data.folder.name,
      _id: data.folder._id,
      createdAt: data.folder.createdAt, //change to less obnoxious form
      updatedAt: data.folder.updatedAt, //change to less obnoxious form
    }));
};

// create folder
const onCreateFolder = function (event) {
  let folderData = getFormFields(this); //convert this to target text field
  event.preventDefault(); //wont need this when I get rid of submit button

  // get form data
  let data = {
    folder: {
      name: folderData.name,
      path: app.currentPath,
    },
  };

  // send form data
  api.createFolder(data)
    .done(addOneFolder)
    .fail(ui.onError);
  $('#create-folder').modal('hide');
};

// add file to UI
const addOneFile = (data) => {
  //split date-time string into date and timef
  let strSplitC = data.file.createdAt.split('T');
  let strSplitU = data.file.updatedAt.split('T');

  //put only date into data
  data.file.createdAt = strSplitC[0];
  data.file.updatedAt = strSplitU[0];

  //handlebars
  let userFileTemplate = require('./templates/current-user-file.handlebars');
    $('#main-content').append(userFileTemplate({
      name:data.file.name,
      _id: data.file._id,
      url: data.file.url,
      createdAt: data.file.createdAt, //change to less obnoxious form
      updatedAt: data.file.updatedAt, //change to less obnoxious form
    }));
};

// user clicks on users folder
const openFolder = function (newPath) {
  // update current path
  app.currentPath = newPath;

  // get current path to open folder
  let search = app.currentPath;

  // show folders
  api.showRootFolder(search)
    .done(displayUserFolder)
    .fail(ui.onError);

  // show files
  api.showRootFiles(search)
    .done(displayUserFile)
    .fail(ui.onError);
};

// display other users folders
const displayOtherUserFolder = function(data){
  //make createdat and updatedat look better
  for (let i = 0; i < data.folders.length; i++) {
    //split date-time string into date and timef
    let strSplitC = data.folders[i].createdAt.split('T');
    let strSplitU = data.folders[i].updatedAt.split('T');

    //put only date into data
    data.folders[i].createdAt = strSplitC[0];
    data.folders[i].updatedAt = strSplitU[0];
  }

  //handlebars
  let otherUserFolderTemplate = require('./templates/other-users-folder.handlebars');
    $('#main-content').html(otherUserFolderTemplate({
      folders: data.folders
    }));
};

// display other users files
const displayOtherUserFile = function(data){
  //make createdat and updatedat look better
  for (let i = 0; i < data.files.length; i++) {
    //split date-time string into date and timef
    let strSplitC = data.files[i].createdAt.split('T');
    let strSplitU = data.files[i].updatedAt.split('T');

    //put only date into data
    data.files[i].createdAt = strSplitC[0];
    data.files[i].updatedAt = strSplitU[0];
  }

  //handlebars
  let otherUserFileTemplate = require('./templates/other-users-file.handlebars');
    $('#main-content').append(otherUserFileTemplate({
      files: data.files
    }));
};

// get root of other user
const getOtherRootContents = function (data) {
  // update current path
  app.currentPath = `${app.currentPath},${data.folders[0]._id}`;

  // get current path
  let search = app.currentPath;

  // show folders
  api.showRootFolder(search)
    .done(displayOtherUserFolder)
    .fail(ui.onError);

  // show files
  api.showRootFiles(search)
    .done(displayOtherUserFile)
    .fail(ui.onError);
};

// user clicks on other users folder
const openOtherFolder = function (newPath) {
  // update current path
  app.currentPath = newPath;

  // get curent path
  let search = app.currentPath;

  // show folders
  api.showRootFolder(search)
    .done(displayOtherUserFolder)
    .fail(ui.onError);

  // show files
  api.showRootFiles(search)
    .done(displayOtherUserFile)
    .fail(ui.onError);
};

// handlers for rename, delete, and icon
const onIcon = function (event) {
  // set target, it's what the user clicked on
  let target = $(event.target);

  // rename file
  if (target.hasClass('rename-button')) {
    // get file id
    let fileId = target.data('fileId');

    // get new name
    let newName = $(target).prev().val();

    // set data
    let data = {
      "file" : {
        "name": newName,
      }
    };

    // send data and Id
    api.renameFile(data, fileId)
      .done($(target).prevAll('h5:last').text(newName))
      .fail(ui.onError);
  }
  // delete file
  else if (target.hasClass('delete-button')) {
    // get file id
    let fileId = target.data('fileId');

    // send id
    api.deleteFile(fileId)
      .done($(target).parent().remove())
      .fail(ui.onError);
  }
  // rename folder
  else if (target.hasClass('rename-folder-button')) {
    // get folder id
    let folderId = target.data('folder-id');

    // get new name
    let newName = $(target).prev().val();

    // set data
    let data = {
      "folder" : {
        "name": newName,
      }
    };

    // send data and id
    api.renameFolder(data, folderId)
      .done($(target).prevAll('h5:last').text(newName))
      .fail(ui.onError);
  }
  // delete folder
  else if (target.hasClass('delete-folder-button')) {
    // get folder id
    let folderId = target.data('folder-id');

    // send id
    api.deleteFolder(folderId)
      .done($(target).parent().remove())
      .fail(ui.onError);
  }
  // open folder
  else if (target.hasClass('foldericon')) {
    // get path
    let path = target.data('path');

    // get folder id
    let folderId = target.nextAll('button:first').data('folder-id');

    // set path for search
    let newPath = `${path},${folderId}`;

    // open folder
    openFolder(newPath);
  }
  // open other users folder
  else if (target.hasClass('otherfoldericon')) {
    // get path
    let path = target.data('path');

    // get folder id
    let folderId = target.data('folder-id');

    // set path for search
    let newPath = `${path},${folderId}`;

    // open folder
    openOtherFolder(newPath);
  }
};

// handlers for users
const onUser = function (event) {
  // target is what the user clicked on
  let target = $(event.target);

  // if user clicks on their own username
  if (target.data('id') === app.user._id) {
    //show buttons
    $('.create-folder').show();
    $('.upload-file').show();

    //open their own root folder
    getRootFolder(app);
  }
  // if user clicks on any other user
  else {
    //hide buttons
    $('.create-folder').hide();
    $('.upload-file').hide();

    // get path for search
    let search = target.data('path');

    // update current path
    app.currentPath = search;

    // open other user root
    api.showRootFolder(search)
      .done(getOtherRootContents)
      .fail(ui.onError);
  }
};

// upload file
const uploadFile = function (event) {
  event.preventDefault();
  let data = new FormData(this);

  // add path to data
  data.append('path', app.currentPath);

  // send to amazon web service
  api.uploadAWS(data)
    .done(addOneFile)
    .done($('#upload-file').modal('hide'))
    .fail(err => console.error(err));
};

// go up one folder level
const upLevel = function () {
  //get current path
  let path = app.currentPath;

  //split then reassemble w/o last segment of path
  let strSplit = path.split(',');
  let newPath = '';
  if (strSplit.length > 3) {
    for (let i = 1; i < (strSplit.length - 1); i++) {
      newPath = newPath + ',' + strSplit[i];
    }
  }
  else {
    newPath = path;
  }

  //send newPath
  openFolder(newPath);
};

// go to root
const goRoot = function () {
  //get current path
  let path = app.currentPath;

  //split then reassemble with only the first two paths
  let strSplit = path.split(',');
  let newPath = '';
  for (let i = 1; i < 3; i++) {
    newPath = newPath + ',' + strSplit[i];
  }

  //send newPath
  openFolder(newPath);
};

// go to home root
const goHome = function () {
  console.log('home');
  //set current folder path
  app.currentPath = `,${app.user._id}`;

  // get current path to open root
  let search = app.currentPath;

  // send data
  api.showRootFolder(search)
    .done(getRootContents)
    .fail(ui.onError);
};

// handlers
const addHandlers = () => {
  $('.create-folder').hide();
  $('.upload-file').hide();
  $('#up-button').hide();
  $('#root-button').hide();
  $('#home-button').hide();
  $('.users').hide();
  $('.icon-div').on('click', onIcon);
  $('.sidebar-nav').on('click', onUser);
  $('.sign-up-form').on('submit', onSignUp);
  $('.sign-in-form').on('submit', onSignIn);
  $('.change-password-form').on('submit', onChangePassword);
  $('#sign-out').on('click', OnSignOut);
  $('.create-folder-form').on('submit', onCreateFolder);
  $('#my-folder').on('click', api.getMyFolders);
  $('#multipart-form-data').on('submit', uploadFile);
  $('#up-button').on('click', upLevel);
  $('#root-button').on('click', goRoot);
  $('#home-button').on('click', goHome);
};

module.exports = {
  addHandlers,
};
