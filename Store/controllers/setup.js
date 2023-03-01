const Token = require('./generateToken.js');
const db = require('../generics/db/db.js');
var fs = require('fs');
var axios = require('axios');
let setupData, setupSuccessMsg, setupErrorMsg;


exports.AddSetUp = async (req, page_res, next) => {
    setupSuccessMsg = null;
    setupErrorMsg = null;
    var { storeCode, uuid } = req.body;
    FilePath = next;
    let x_api_key = uuid.split(" ").join("");
    storeCode = storeCode.split(" ").join("");
            
    await db.select().from('store').where({storefrontStoreCode: storeCode, uuid: x_api_key}).then(async (record_res) => {
        if(record_res.length<=0){
            await db('store').insert({ storefrontStoreCode: storeCode, uuid: x_api_key, filePath: FilePath}).then((store_res) => {                
             setupSuccessMsg = 'Set Up details Added Successfully!';
            })
            .catch(err => {
                return page_res.render('SetUp', {
                error: 'Something went wrong while inserting store data to database',
                btn_name: 'Save'
                })
            })
        }
        else{
            setupErrorMsg = 'Record already exist';
        }
    }).catch((err)=> {
        return page_res.render('SetUp', {
            error: 'Something went wrong while selecting store data from database',
            btn_name: 'Save'
        })
    })
   
    await db.select().from('store').then(async (result_res) => {
        setupData = result_res;
    }).catch((err) => {
        return page_res.render('SetUp', {
            error: 'Unable to select Store data from database',
            btn_name: 'Save'
        })
    })

    return page_res.render('SetUp', {
        data: setupData,
        btn_name: 'Save',
        success_msg: setupSuccessMsg,
        error: setupErrorMsg
    })
}


exports.ViewSetUp = async (req, page_res) => {
    if (req.session.already_logged === 'false' || req.session.already_logged === undefined) {
        page_res.redirect('/');
    }
    else {
        await db.select().from('store').then(async (store_res) => {
            return page_res.render('SetUp', {
                data: store_res,
                btn_name: 'Save',
                title: 'SetUp',
                success_msg: setupSuccessMsg
            })
        }).catch((err) => {
            return page_res.render('SetUp', {
                error: 'Unable to select Store data from database',
                btn_name: 'Save',
                title: 'SetUp'
            })
        })
    }
}



exports.getSetUpById = async (req, page_res) => {
    if (req.session.already_logged === 'false' || req.session.already_logged === undefined) {
        page_res.redirect('/')
    }
    else {

        var ids = req.params.Id;
        var id = Buffer.from(ids, 'base64').toString('utf-8');
        if (id != undefined) {
            await db.select().from('store').where({ Id: id }).then(async (view_response) => {
                await db.select().from('store').then(async (setup_res) => {
                    setupData = setup_res
                })
                .catch((err)=> {
                    return page_res.render('SetUp', {
                        error: 'Something went wrong while getting setup data from database'
                    })
                })
                if (view_response.length > 0) {
                    return page_res.render('SetUp', {
                        storeData: view_response[0],
                        data: setupData,
                        btn_name: 'Update'
                    })
                }
                else {
                    return page_res.render('SetUp', {
                        error: 'Unable to find data'
                    })
                }
            })
                .catch(err => {
                    return page_res.render('SetUp', {
                        error: 'Something went wrong while getting setup detail'
                    })
                });
        }
        else {
            return page_res.render('SetUp', {
                error: 'Unable to get Id'
            })
        }
    }
}

exports.UpdateSetUp = async (req, page_res, next) => {
    var ids = req.params.Id;
    var id = Buffer.from(ids, 'base64').toString('utf-8');
    var { storeCode, uuid } = req.body;
    uuid = uuid.split(" ").join("");
    storeCode = storeCode.split(" ").join("");
    if (next.filePath != undefined) {
        await db.select().from('store').where({ Id: id }).returning('filePath').then(async (select_response) => {
            // delete file from uploads folder
            fs.unlink(select_response[0].filePath, (err) => {
                if (err) {
                    return page_res.render('SetUp', {
                        error: 'Unable to delete setup file from uploads folder'
                    })
                }
            })
        }).catch((err) => {
            return page_res.render('SetUp', {
                error: 'Unable to get filepath from database'
            })
        })
        await db('store').update({ storefrontStoreCode: storeCode, uuid: uuid, filePath: next.filePath }).where({ Id: id }).then((setup_res) => {
        }).catch((err) => {
            return page_res.render('SetUp', {
                error: 'Unable to Update data in database'
            })
        })
    }
    else {
        await db('store').update({ storefrontStoreCode: storeCode, uuid: uuid }).where({ Id: id }).then((setup_response) => {
        }).catch((err) => {
            return page_res.render('SetUp', {
                error: 'Unable to Update data in database',
            })
        })
    }     
        setupSuccessMsg = 'Set Up details updated Successfully!';
        return page_res.redirect('/SetUp');
}


exports.deleteSetUp = async (req, page_res) => {
    var ids = req.params.Id;
    var id = Buffer.from(ids, 'base64').toString('utf-8');
    if (id != undefined) {
        await db('store').where({ Id: id }).del().then((res) => {
           return page_res.redirect('/SetUp');
        }).catch((err) => {
            return page_res.render('SetUp', {
                error: 'Something went wrong while deleting store data'
            })
        });
    }
    else {
        return page_res.render('SetUp', {
            error: 'Unable to get Id for deleting store data'
        })
    }
}