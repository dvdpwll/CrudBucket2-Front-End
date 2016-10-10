'use strict';

const app = require('./app');

let path;

const signUp = function (data) {
  return $.ajax({
    url: app.api + '/sign-up',
    method: 'POST',
    //data: data,
    data,
  });
};

const signIn = function (data) {
  return $.ajax({
    url: app.api + '/sign-in',
    method: 'POST',
    data,
  });
};

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

const signOut = () => $.ajax({
  url: app.api + '/sign-out/' + app.user._id,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
});

const createRootFolder = function (data) {
  return $.ajax({
    url: app.api + '/rootfolders',
    method: 'POST',
    data,
  });
};

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

const showFolders = function (data) {
  for (let i = 0; i < data.folders.length; i++) {
    if (data.folders[i].path === path) {
      console.log(data.folders[i].name);
    }
  }
};

const showRootFolder = (path) => $.ajax({
  url: app.api + '/rootfolders/' + path,
  method: 'GET',
});

const showRootFiles = (path) => $.ajax({
  url: app.api + '/rootfiles/' + path,
  method: 'GET',
});

const getFolders = function () {
  return $.ajax({
    url: app.api + '/folders',
    method: 'GET',
  }).done(function (data) {
      showFolders(data);
    });
};

const getUsers = function () {
  return $.ajax({
    url: app.api + '/users',
    method: 'GET',
  });
};

const getMyFolders = function () {
  return $.ajax({
    url: app.api + '/userfolders',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  }).done(function (data) {
      console.log(data);
    });
};

const deleteFile = function(fileId) {
  return $.ajax({
    url: app.api + '/files/' + fileId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

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
  getFolders,
  getMyFolders,
  createRootFolder,
  showRootFolder,
  showRootFiles,
  deleteFile,
  renameFile,
  renameFolder,
  deleteFolder,
};
