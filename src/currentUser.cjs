const connection = require('../config/mysql.cjs');
const express = require('express');
const currentUserModel = require('../models/currentUserModel.cjs');

async function getCurrentUserId(cookies) {
    if (typeof cookies === 'object') {
        let token = cookies.token;

        let userAuthValidation = await currentUserModel.selectAuthToken(token);
        console.log(userAuthValidation, 'token token token')

        let userOutputByToken = await currentUserModel.userOutputByToken(token);
        console.log(userOutputByToken, 'userOutputByToken');

        if (userAuthValidation.length != 0) {
            console.log('Функція працює: ', userAuthValidation);
            return userAuthValidation[0].users_id;
        } else {
            console.log('Помилка');
        }
        if (userOutputByToken.length != 0) {
            console.log('Функція працює: ', userOutputByToken);
            return userOutputByToken[0].id;
        } else {
            console.log('Помилка rowsTwo')
        }
    } else {
        return null;
    }
}

module.exports = getCurrentUserId;