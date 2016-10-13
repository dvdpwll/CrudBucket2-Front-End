'use strict';

const app = require('./app');

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = () => {
  $('#sign-up-button').hide();
  $('#sign-in-button').hide();
  $('#up-button').show();
  $('#root-button').show();
  $('#home-button').show();
  $('.create-folder').show();
  $('.upload-file').show();
  $('.users').show();
};

const signOutSuccess = () => {
  delete app.user;
  $('.icon-div').empty();
  $('.sidebar-nav').empty();
  $('#up-button').hide();
  $('#root-button').hide();
  $('#home-button').hide();
  $('#sign-up-button').show();
  $('#sign-in-button').show();
};

const createSuccess = () => {
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  app,
  createSuccess,
};
