/*
* Title: handle fs and manage data
* Description: crud and manage data using fs
* Author: Mamunur Rashid
* Date: 13/07/2022
*
*/

// dependencies
const fs = require('fs');
const path = require('path');

// module scafolding
const lib = {};

// data basedir
const basedir = path.join(__dirname, '../.data/');

// create data 
lib.create = (dir, file, data, callback) => {
    fs.open(`${basedir + dir}/${file}.json`, 'wx', (err1, fileDescriptor) => {
        if(!err1 && fileDescriptor){
            // convert data to srting
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, (err2, fileDescriptor) => {
                if(!err2 && fileDescriptor){
                    fs.close(fileDescriptor, (err3) => {
                        if(!err3){
                            callback(false);
                        } else {
                            callback('Error while closing file');
                        }
                    })
                } else {
                    callback('Error while writing data');
                }
            })
        } else {
            callback('There was a error, file may already exists');
        }
    })
};
// read data
lib.read = (dir, file, callback) => {
    fs.readFile(`${basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

// update data
lib.update = (dir, file, data, callback) => {
    fs.open(`${basedir + dir}/${file}.json`, 'r+', (err1, fileDescriptor) => {
        if(!err1 && fileDescriptor){
            // convert data to string
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err2) => {
                if(!err2) {
                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if(!err3){
                            fs.close(fileDescriptor, (err4) => {
                                if(!err4){
                                    callback(false);
                                } else {
                                    callback('Error while closing file');
                                }
                            })
                        } else {
                            callback('Error while writing file.');
                        }
                    })
                } else {
                    callback('Error while truncating file.');
                }
            })
        } else {
            callback(err1);
        }
    })
}

// delete data
lib.delete = (dir, file, callback) => {
    fs.unlink(`${basedir + dir}/${file}.json`, (err) => {
        if(!err){
            callback(false);
        } else {
            callback(err);
        }
    })
}

module.exports = lib;