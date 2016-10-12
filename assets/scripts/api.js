'use strict';

const app = require('./app');

// after sign up create a root folder for new user
const createRootFolder = (data) => $.ajax({
  url: app.api + '/rootfolders',
  method: 'POST',
  data,
});

// create a new user
const signUp = (data) => $.ajax({
  url: app.api + '/sign-up',
  method: 'POST',
  //data: data,
  data,
});

// get root files
const showRootFiles = (path) => $.ajax({
  url: app.api + '/rootfiles/' + path,
  method: 'GET',
});

// get root folder
const showRootFolder = (path) => $.ajax({
  url: app.api + '/rootfolders/' + path,
  method: 'GET',
});

// get all users
const getUsers = () => $.ajax({
  url: app.api + '/users',
  method: 'GET',
});

// sign in a user
const signIn = (data) => $.ajax({
  url: app.api + '/sign-in',
  method: 'POST',
  data,
});

// change the password
const changePassword = (data) => $.ajax({
  url: app.api + '/change-password/' + app.user._id,
  method: 'PATCH',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  data,
});

// sign out the user
const signOut = () => $.ajax({
  url: app.api + '/sign-out/' + app.user._id,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
});

// create a new folder
const createFolder = (data) => $.ajax({
  url: app.api + '/folders',
  method: 'POST',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  data,
});

// rename file
const renameFile = (data, fileId) => $.ajax({
  url: app.api + '/files/' + fileId,
  method: 'PATCH',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  data,
});

// delete a file
const deleteFile = (fileId) => $.ajax({
  url: app.api + '/files/' + fileId,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
});

// rename a folder
const renameFolder = (data, folderId) => $.ajax({
  url: app.api + '/folders/' + folderId,
  method: 'PATCH',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  data,
});

// delete a folder
const deleteFolder = (folderId) => $.ajax({
  url: app.api + '/folders/' + folderId,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
});

// upload a file to aws
const uploadAWS = (data) => $.ajax({
  url: app.api + '/files',
  method: 'POST',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  processData: false,
  contentType: false,
  data,
});

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  createFolder,
  getUsers,
  createRootFolder,
  showRootFolder,
  showRootFiles,
  deleteFile,
  renameFile,
  renameFolder,
  deleteFolder,
  uploadAWS,
};
