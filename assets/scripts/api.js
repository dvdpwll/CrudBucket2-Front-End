'use strict';

const app = require('./app');
let path; //***********

// after sign up create a root folder for new user
const createRootFolder = function (data) {
  return $.ajax({
    url: app.api + '/rootfolders',
    method: 'POST',
    data,
  });
};

// create a new user
const signUp = function (data) {
  return $.ajax({
    url: app.api + '/sign-up',
    method: 'POST',
    //data: data,
    data,
  });
};

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
const getUsers = function () {
  return $.ajax({
    url: app.api + '/users',
    method: 'GET',
  });
};

// sign in a user
const signIn = function (data) {
  return $.ajax({
    url: app.api + '/sign-in',
    method: 'POST',
    data,
  });
};

// change the password
const changePassword = function (data) {
  return $.ajax({
    url: app.api + '/change-password/' + app.user._id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
};

// sign out the user
const signOut = () => $.ajax({
  url: app.api + '/sign-out/' + app.user._id,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
});

// create a new folder
const createFolder = function (data) {
  return $.ajax({
    url: app.api + '/folders',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data,
  });
};

// rename file
const renameFile = function(data, fileId) {
  return $.ajax({
    url: app.api + '/files/' + fileId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data,
  });
};

// delete a file
const deleteFile = function(fileId) {
  return $.ajax({
    url: app.api + '/files/' + fileId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

// rename a folder
const renameFolder = function(data, folderId) {
  return $.ajax({
    url: app.api + '/folders/' + folderId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data,
  });
};

// delete a folder
const deleteFolder = function(folderId) {
  return $.ajax({
    url: app.api + '/folders/' + folderId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

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
};
