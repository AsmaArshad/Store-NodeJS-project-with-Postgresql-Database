const db = require('../generics/db/db.js');
const Token = require('./generateToken.js');
var fs = require('fs');
var axios = require('axios');
let ProductResponse, stockResponse, token, productMessage;
let stock_Message = null;
let product_Json = null;
let setupData;
let ProductData;
let apiResponse = null;
let stockMessages =[];
 let stores;
exports.ViewProductPage = async (req, page_res) => {
    if (req.session.already_logged === 'false' || req.session.already_logged === undefined) {
        page_res.redirect('/');
    }
    else {

       
        let productData;
        if (product_Json != null) {
            await db.select().distinct().from('store').then(async (store_res) => {
                stores = store_res
            })
                .catch((err) => {
                    return page_res.render('product', {
                        error: 'Something went wrong while getting all stores from database'
                    })
                })
            return page_res.render('product', {
                title: 'View Product',
                stockData: null,
                storeData: product_Json,
                error: apiResponse,
                stores
            });
        }
        else {
            await db.select().from('products').then(async (product_res) => {
                productData = product_res;
            }).catch((err) => {
                return page_res.render('product', {
                    error: 'Something went wrong while getting product data from database'
                })
            })

            await db.select().distinct().from('store').then(async (store_res) => {
                stores = store_res
            })
                .catch((err) => {
                    return page_res.render('product', {
                        error: 'Something went wrong while getting all stores from database'
                    })
                })
            return page_res.render('product', {
                title: 'View Product',
                stockData: null,
                storeData: productData,
                stores
            });
        }
    }
}


exports.getProduct = async (req, page_res) => {
    stock_Message = null;
    if (req.session.already_logged === 'false' || req.session.already_logged === undefined) {
        page_res.redirect('/');
    }
    else {
        await db.select().distinct().from('store').then(async (store_res) => {
            stores = store_res
        })
            .catch((err) => {
                return page_res.render('product', {
                    error: 'Something went wrong while getting all stores from database'
                })
            })
        var { store, skuId } = req.body;
        skuId = skuId.split(" ").join("");
        let storeData, privateKeyPath, uuid;

        await db.select().from('store').where({ storefrontStoreCode: store }).then(async (store_res) => {
            if (store_res.length > 0) {
                privateKeyPath = store_res[0].filePath;
                uuid = store_res[0].uuid;
                setupData = store_res;
            }
            else {
                return page_res.render('product', {
                    error: 'First add setUp details from SetUp page',
                    stores
                })
            }
        }).catch((err) => {
            return page_res.render('product', {
                error: 'Something went wrong while getting store detail from database.',
                stores
            })
        })

        if (privateKeyPath != undefined) {
            let privateKey = fs.readFileSync(privateKeyPath);
            if (privateKey != undefined) {
                let token = await Token.getToken(privateKey, uuid);
                if (token != undefined) {
                    await getProductApiResponse(req, page_res, token, store, skuId);
                    if (ProductResponse == undefined) {
                        for (let i = 0; i <= setupData.length; i++) {
                            if (setupData[i + 1] != undefined) {
                                uuid = setupData[i + 1].uuid;
                                token = await Token.getToken(privateKey, uuid);
                                await getProductApiResponse(req, page_res, token, store, skuId);
                                if (ProductResponse != undefined) {
                                    break;
                                }
                            }
                            else {
                                apiResponse = 'InValid SetUp Credentials';

                            }
                        }
                    }

                    await getStockApiResponse(req, page_res, token, store, skuId)
                }
                else {
                    return page_res.render('product', {
                        error: 'Unable to generate Token',
                        stores
                    })
                }
                var productResponse = ProductResponse;
                var stock_response = stockResponse;
                if (stockResponse != undefined) {
                    stock_response[0].store = store;
                }

                await db.select().from('products').where({ MerchantID: store, MerchantSKUID: skuId }).then(async (product_res) => {
                    if (apiResponse != null) {
                        await db.select().distinct().from('store').then(async (store_res) => {
                            stores = store_res
                        })
                            .catch((err) => {
                                return page_res.render('product', {
                                    error: 'Something went wrong while getting all stores from database'
                                })
                            })

                        return page_res.render('product', {
                            error: apiResponse,
                            stores,
                            storeData: product_res,
                        })

                    }

                    if (productResponse != null && stock_response != null) {
                        return page_res.render('product', {
                            data: productResponse,
                            stockData: stock_response[0],
                            storeData: product_res,
                            stock_Message,
                            productMessage,
                            stores
                        })
                    }
                    else if (productResponse != null) {
                        return page_res.render('product', {
                            data: productResponse,
                            storeData: product_res,
                            productMessage,
                            stores
                        })
                    }
                    else if (stock_response != null) {
                        return page_res.render('product', {
                            stockData: stock_response[0],
                            storeData: product_res,
                            stock_Message,
                            stores
                        })
                    }
                    else if (productMessage == "getaddrinfo ENOTFOUND mms-api.shoalter.com" || stock_Message == "getaddrinfo ENOTFOUND mms-api.shoalter.com") {
                        return page_res.render('product', {
                            storeData: product_res,
                            stores,
                            productMessage: 'Please Check your Internet Connection. getaddrinfo ENOTFOUND mms-api.shoalter.com',
                        })
                    }
                    else {
                        return page_res.render('product', {
                            error: error.message,
                            stores
                        })
                    }
                }).catch((err) => {
                    return page_res.render('product', {
                        error: 'Something went wrong while getting product data from database',
                        stores
                    })
                })
            }
            else {
                return page_res.render('product', {
                    error: 'Unable to generate Private Key',
                    stores
                })
            }
        }
    }
}



async function getProductApiResponse(req, page_res, token, store, skuCode) {
    var config = {
        method: 'get',
        url: 'https://mms-api.shoalter.com/mmsAdmin/oapi/api/product/details',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
            'storeCode': store,
            'platformCode': 'HKTV',
            'businessType': 'eCommerce'
        },
        data: JSON.stringify([
            {
                "skuCode": `${skuCode}`
            }
        ])
    };

    await axios(config)
        .then(function (response) {
            // if (response.data.message == 'authentication fail') {
            //     return page_res.render('product', {
            //         error: 'Authentication failed. Your Auth token has been expired.'
            //     })
            // }
            if (response.data.data[0].status == 'failed') {
                productMessage = response.data.data[0].message;
            }
            ProductResponse = response.data.data;

        })
        .catch((error) => {
            if (error.message == "getaddrinfo ENOTFOUND mms-api.shoalter.com") {
                productMessage = error.message
            }
            // else {
            //     return page_res.render('product', {
            //         error: error.message
            //     })
            // }
        });
}

exports.GetProductStock = async (req, page_res) => {
    ProductResponse = undefined;
    stock_Message = null;
    if (req.session.already_logged === 'false' || req.session.already_logged === undefined) {
        page_res.redirect('/');
    }
    else {
        let StoreCode, skuCode, privateKeyPath, uuid;
        skuCode = req.params.productId;
        await db.select().from('products').where({ MerchantSKUID: skuCode }).then(async (view_response) => {
            StoreCode = view_response[0].MerchantID;
        }).catch((err) => {
            return page_res.render('product', {
                error: 'Something went wrong while getting product data from database.'
            })
        })

        await db.select().from('store').where({ storefrontStoreCode: StoreCode }).then(async (store_response) => {
            if (store_response.length > 0) {
                privateKeyPath = store_response[0].filePath;
                uuid = store_response[0].uuid;
                setupData = store_response;
            }
            else {
                await db.select().from('store').then(async (store_res) => {
                    stores = store_res;
                }).catch((err) => {

                })

                await db.select().from('products').then(async (product_res) => {
                    productResponse = product_res;
                }).catch((err) => {

                })

                return page_res.render('product', {
                    error: 'SetUp Credentials for given store not found',
                    stores,
                    storeData: productResponse,
                })
            }
        }).catch((err) => {
            return page_res.render('product', {
                error: 'Something went wrong while getting store detail from database.'
            })
        })

        if (privateKeyPath != undefined) {
            let privateKey = fs.readFileSync(privateKeyPath);
            if (privateKey != undefined) {
                let token = await Token.getToken(privateKey, uuid);
                if (token != undefined) {
                    await getProductApiResponse(req, page_res, token, StoreCode, skuCode);
                    if (ProductResponse == undefined) {
                        for (let i = 0; i <= setupData.length; i++) {
                            if (setupData[i + 1] != undefined) {
                                uuid = setupData[i + 1].uuid;
                                token = await Token.getToken(privateKey, uuid);
                                await getProductApiResponse(req, page_res, token, StoreCode, skuCode);
                                if (ProductResponse != undefined) {
                                    break;
                                }
                            }
                            else {
                                apiResponse = 'InValid SetUp Credentials';
                            }
                        }
                    }
                    await getStockApiResponse(req, page_res, token, StoreCode, skuCode)
                }
                else {
                    return page_res.render('product', {
                        error: 'Unable to generate Token'
                    })
                }
                var productResponse = ProductResponse;
                var stock_response = stockResponse;
                if (stockResponse != undefined) {
                    stock_response[0].store = StoreCode;
                }

                await db.select().from('products').then(async (product_res) => {
                    if (apiResponse != null) {
                        await db.select().distinct().from('store').then(async (store_res) => {
                            stores = store_res
                        })
                            .catch((err) => {
                                return page_res.render('product', {
                                    error: 'Something went wrong while getting all stores from database'
                                })
                            })

                        return page_res.render('product', {
                            error: apiResponse,
                            stores,
                            storeData: product_res,
                        })
                    }

                    await db.select().distinct().from('store').then(async (store_res) => {
                        stores = store_res
                    })
                        .catch((err) => {
                            return page_res.render('product', {
                                error: 'Something went wrong while getting all stores from database'
                            })
                        })









                    if (productResponse != null && stock_response != null) {
                        return page_res.render('product', {
                            data: productResponse,
                            stockData: stock_response[0],
                            storeData: product_res,
                            stock_Message,
                            productMessage,
                            stores
                        })
                    }
                    else if (productResponse != null) {
                        return page_res.render('product', {
                            data: productResponse,
                            storeData: product_res,
                            productMessage,
                            stores
                        })
                    }
                    else if (stock_response != null) {
                        return page_res.render('product', {
                            stockData: stock_response,
                            storeData: product_res,
                            stock_Message,
                            stores
                        })
                    }
                    else if (productMessage == "getaddrinfo ENOTFOUND mms-api.shoalter.com" || stock_Message == "getaddrinfo ENOTFOUND mms-api.shoalter.com") {
                        return page_res.render('product', {
                            storeData: product_res,
                            productMessage: 'Please Check your Internet Connection. getaddrinfo ENOTFOUND mms-api.shoalter.com',
                            stores
                        })
                    }
                    else {
                        return page_res.render('product', {
                            error: 'Unable to get Product & Stock response',
                            stores
                        })
                    }
                }).catch((err) => {
                    return page_res.render('product', {
                        error: 'Something went wrong while getting product data from database',
                        stores
                    })
                })
            }
            else {
                return page_res.render('product', {
                    error: 'Unable to generate Private Key',
                    stores
                })
            }
        }
    }
}


async function getStockApiResponse(req, page_res, token, store, productId) {
    stock_Message = null;
    var config = {
        method: 'get',
        url: 'https://mms-api.shoalter.com/mmsAdmin/oapi/api/stock/details',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
            'storeCode': store,
            'platformCode': 'HKTV',
            'businessType': 'eCommerce'
        },
        data: JSON.stringify([
            {
                "warehouseId": null,
                "productId": `${productId}`
            }
        ])
    };

    await axios(config)
        .then((response) => {
            // if (response.data.message == 'authentication fail') {
            //     return page_res.render('product', {
            //         error: 'Authentication failed. Your Auth token has been expired.'
            //     })
            // }
            if (response.data.data[0].status == 'failed') {
                stock_Message = 'Unable to get Product Stock. ' + response.data.data[0].message;
            }
            stockResponse = response.data.data;
        })
        .catch((error) => {
            if (error.message == "getaddrinfo ENOTFOUND mms-api.shoalter.com") {
                stock_Message = error.message
            }
            // else {
            //     return page_res.render('product', {
            //         error: error.message
            //     })
            // }
        });
}

exports.UpdateProductStock = async (req, page_res) => {
    if (req.session.already_logged === 'false' || req.session.already_logged === undefined) {
        page_res.redirect('/');
    }
    else {

        await db.select().distinct().from('store').then(async (store_res) => {
            stores = store_res
        })
            .catch((err) => {
                return page_res.render('product', {
                    error: 'Something went wrong while getting all stores from database'
                })
            })

        productMessage = null;
        stock_Message = null;
        var store = req.query.store;
        if (store != '') {
            req.session.store = store;
        }
        else {
            store = req.session.store;
        }
        let storeData, skuCode;
        var productId = req.query.productId;
        var Quantity = req.query.quantity;
        await db.select().from('store').where({ storefrontStoreCode: store }).then(async (store_res) => {
            if (store_res.length > 0) {
                setupData = store_res;
                let privateKey = fs.readFileSync(store_res[0].filePath);
                if (privateKey != undefined) {
                    token = await Token.getToken(privateKey, store_res[0].uuid);
                    if (token != undefined) {
                        await updateStockApi(req, page_res, token, store, productId, Quantity);
                        if (ProductResponse == undefined) {
                            for (let i = 0; i <= setupData.length; i++) {
                                uuid = setupData[i + 1].uuid;
                                token = await Token.getToken(privateKey, uuid);
                                await updateStockApi(req, page_res, token, store, productId, Quantity);
                                if (ProductResponse != undefined) {
                                    break;
                                }
                            }
                        }

                    }
                    else {
                        return page_res.render('product', {
                            error: 'Unable to generate Token',
                            stores
                        })
                    }
                }
                else {
                    return page_res.render('product', {
                        error: 'Unable to generate Private Key',
                        stores
                    })
                }
            }
            else {
                return page_res.render('product', {
                    error: 'First add setUp details from SetUp page',
                    stores
                })
            }
        })
            .catch((err) => {
                return page_res.render('product', {
                    error: 'Unable to get Private Key Path from database',
                    stores
                })
            })
        await getStockApiResponse(req, page_res, token, store, productId);

        if (stockResponse == undefined) {
            for (let i = 0; i <= setupData.length; i++) {
                uuid = setupData[i + 1].uuid;
                token = await Token.getToken(privateKey, uuid);
                await getStockApiResponse(req, page_res, token, store, productId);
                if (stockResponse != undefined) {
                    break;
                }
            }
        }
        var stock_response = stockResponse;
        await db.select().from('products').then(async (store_res) => {
            storeData = store_res
            skuCode = store_res[0].MerchantSKUID;
            await getProductApiResponse(req, page_res, token, store, skuCode);
        }).catch((err) => {
            return page_res.render('product', {
                error: 'Something went wrong while getting product data from database',
                stores
            })
        })
        if (productMessage != 'invalid productId or product is offline') {
            stockMessage = 'Stock Updated Successfully!';
        }
        return page_res.render('product', {
            stockMessage,
            stockData: stock_response[0],
            data: ProductResponse,
            storeData,
            productMessage,
            stores

        })
    }
}



async function updateStockApi(req, page_res, token, store, productId, Quantity) {
    var config = {
        method: 'post',
        url: 'https://mms-api.shoalter.com/mmsAdmin/oapi/api/stock',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
            'storeCode': store,
            'platformCode': 'HKTV',
            'businessType': 'eCommerce'
        },
        data: JSON.stringify([
            {
                "warehouseId": null,
                "productId": `${productId}`,
                "quantity": `${Quantity}`,
                "action": "set"
            }
        ])
    };

    await axios(config)
        .then((response) => {
            // if (response.data.message == 'authentication fail') {
            //     return page_res.render('product', {
            //         error: 'Please Select valid Quantity'
            //     })
            // }

            ProductResponse = response.data.data;
        })
        .catch((error) => {

            // return page_res.render('product', {
            //     error: error.message

            // })
        });
}


exports.UpdateAllProducts = async (req, page_res) => {
    if (req.session.already_logged === 'false' || req.session.already_logged === undefined) {
        page_res.redirect('/');
    }
    else {
        await db.select().distinct().from('store').then(async (store_res) => {
            stores = store_res
        })
            .catch((err) => {
                return page_res.render('product', {
                    error: 'Something went wrong while getting all stores from database'
                })
            })
        let privateKeyPath, uuid, store;
        await db.select().from('products').then(async (product_res) => {
            for (let i = 0; i < product_res.length; i++) {
                store = product_res[i].MerchantID;
                await db.select().from('store').where({ storefrontStoreCode: store }).then(async (store_res) => {
                    if (store_res.length > 0) {
                        privateKeyPath = store_res[0].filePath;
                        uuid = store_res[0].uuid;
                        setupData = store_res;
                    
                    }
                    else{
                        privateKeyPath = undefined;
                    }
                })

                if (privateKeyPath != undefined) {
                    let privateKey = fs.readFileSync(privateKeyPath);
                    if (privateKey != undefined) {
                        token = await Token.getToken(privateKey, uuid);
                        if (token != undefined) {

                            let productId = product_res[i].MerchantSKUID;
                            let Quantity = product_res[i].quantity;
                            ProductData = product_res;
                            let counter = i;
                            await UpdateAllProductStockApi(req, page_res, token, store, productId, Quantity, counter);
                            if (ProductResponse == undefined) {
                                for (let i = 0; i <= setupData.length; i++) {
                                    if (setupData[i + 1] != undefined) {
                                        uuid = setupData[i + 1].uuid;
                                        token = await Token.getToken(privateKey, uuid);

                                        await UpdateAllProductStockApi(req, page_res, token, store, productId, Quantity, counter);
                                        if (ProductResponse != undefined) {
                                            break;
                                        }
                                    }
                                }
                            }

                        }
                        else {
                            return page_res.render('product', {
                                error: 'Unable to generate Token',
                                stores
                            })
                        }
                    }
                    else {
                        return page_res.render('product', {
                            error: 'Unable to generate Private Key',
                            stores
                        })
                    }
                }
            }
            product_Json = ProductData;
            return page_res.redirect('/Product');

        })

            .catch((err) => {
                return;
            })
    }
}


async function UpdateAllProductStockApi(req, page_res, token, store, productId, Quantity, counter) {
    var config = {
        method: 'post',
        url: 'https://mms-api.shoalter.com/mmsAdmin/oapi/api/stock',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
            'storeCode': store,
            'platformCode': 'HKTV',
            'businessType': 'eCommerce'
        },
        data: JSON.stringify([
            {
                "warehouseId": null,
                "productId": `${productId}`,
                "quantity": `${Quantity}`,
                "action": "set"
            }
        ])
    };

    await axios(config)
        .then(async (response) => {
            if (response.data.message == 'authentication fail') {
                ProductResponse = undefined;
            }
            else {

                ProductResponse = '';
                ProductData[counter].status = response.data.data[0].message;
                MerchantProductID = ProductData[counter].MerchantProductID;
                await db('products').update({ status: ProductData[counter].status }).where({ MerchantProductID }).then((update_res) => {
                }).catch((err) => {
                    return page_res.render('SetUp', {
                        error: 'Unable to Update data in database',
                    })
                })
            }
        })
        .catch((error) => {
            // return page_res.render('product', {
            //     error: error.message

            // })
        });
}




/*****************************ammendmants */

exports.UpdateAllProductStock = async(req, page_res) => {
    if (req.session.already_logged === 'false' || req.session.already_logged === undefined) {
        page_res.redirect('/');
    }
    else {
        await db.select().distinct().from('store').then(async (store_res) => {
            stores = store_res
        })
            .catch((err) => {
                return page_res.render('product', {
                    error: 'Something went wrong while getting all stores from database'
                })
            })

       let store  = req.body.merID;
       let skuCode = req.body.merSKUid;
       console.log(store);
       let Quantity = req.body.quantity;
       let privateKeyPath, uuid;

                await db.select().from('store').where({ storefrontStoreCode: store }).then(async (store_res) => {
                    if (store_res.length > 0) {
                        privateKeyPath = store_res[0].filePath;
                        uuid = store_res[0].uuid;
                        setupData = store_res;                  
                    }
                    else{
                        privateKeyPath = undefined;
                    }
                }).catch((err)=> {})

                if (privateKeyPath != undefined) {
                    let privateKey = fs.readFileSync(privateKeyPath);
                    if (privateKey != undefined) {
                        token = await Token.getToken(privateKey, uuid);
                        if (token != undefined) {
                            let productId = skuCode
                            ProductData = product_res;
                            let counter = i;
                            await UpdateAllProductStockApi(req, page_res, token, store, productId, Quantity, counter);
                         
                        }
                        else {
                            return page_res.render('product', {
                                error: 'Unable to generate Token',
                                stores
                            })
                        }
                    }
                    else {
                        return page_res.render('product', {
                            error: 'Unable to generate Private Key',
                            stores
                        })
                    }
                }
            
            product_Json = ProductData;
            return;
            //page_res.redirect('/Product');      
    }
}
