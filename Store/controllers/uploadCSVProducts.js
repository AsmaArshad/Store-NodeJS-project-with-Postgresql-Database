const db = require('../generics/db/db.js');
const { Client } = require('pg');
const fs = require('fs');
const fastcsv = require('fast-csv');
let accepted = true;
let errorCol = ''
let stores;
let actualArray = ['Merchant ID', 'Merchant Product ID', 'Primary SKU', 'Merchant SKU ID', 'SKU Name', 'SKU Name (Chi)', 'Warehouse ID', 'StockLevel', 'Online Status', 'Invisible', 'Force Out Of Stock', 'Create Date', 'Offline Date', 'Brand Name (EN)', 'Brand Name (CHI)', 'Height', 'Width', 'Depth', 'Packing Spec(EN)', 'Packing Spec(CHI)', 'Primary Category Code', 'Primary Category Name (CHI)', 'Currency', 'Original Price', 'Discount Price', 'Discount Rate(%)', 'VIP Discount Price', 'VIP Discount Rate(%)', 'GOLD VIP Discount Price', 'GOLD VIP Discount Rate(%)'];

exports.UploadCSVData = async (req, page_res) => {
    await db.select().distinct().from('store').then(async (store_res) => {
        stores = store_res
    })
        .catch((err) => {
            return page_res.render('product', {
                error: 'Something went wrong while getting all stores from database'
            })
        })

    const filePath = req.file.path;
    console.log(filePath);
    if (filePath != undefined) {
        let stream = fs.createReadStream(filePath);
        let csvData = [];
        let csvStream = fastcsv.parse().on("data", (data) => {
            csvData.push(data);
        })
            .on("end", async () => {
                let firstRow = [];
                for (let i = 0; i < csvData[0].length; i++) {
                    firstRow.push(csvData[0][i])
                }

                for (let j = 0; j < actualArray.length; j++) {
                    var dbValue = actualArray[j].split(" ").join("");
                    if (dbValue != firstRow[j].split(" ").join("")) {
                        accepted = false;
                        errorCol = actualArray[j]
                        return
                    } else {
                    }
                }

                if (accepted == true) {
                    // remove the first line: header
                    csvData.shift();

                    await db('products').del().then((delete_res) => {
                    }).catch((err) => {
                        return page_res.render('product', {
                            error: 'Something went wrong while deleting product data',
                            stores
                        })
                    });


                    // SAVE CSV DATA IN POSTGRES
                    for (let a = 0; a < csvData.length; a++) {
                        let row = csvData[a];
                        await db('products').insert({ 'MerchantID': `${row[0]}`, 'MerchantProductID': `${row[1]}`, 'PrimarySKU': `${row[2]}`, 'MerchantSKUID': `${row[3]}`, 'SKUName': `${row[4]}`, 'SKUNameChi': `${row[5]}`, 'WarehouseID': `${row[6]}`, 'StockLevel': `${row[7]}`, 'OnlineStatus': `${row[8]}`, 'Invisible': `${row[9]}`, 'ForceOutOfStock': `${row[10]}`, 'CreateDate': `${row[11]}`, 'OfflineDate': `${row[12]}`, 'BrandNameEN': `${row[13]}`, 'BrandNameCHI': `${row[14]}`, 'Height': `${row[15]}`, 'Width': `${row[16]}`, 'Depth': `${row[17]}`, 'PackingSpecEN': `${row[18]}`, 'PackingSpecCHI': `${row[19]}`, 'PrimaryCategoryCode': `${row[20]}`, 'PrimaryCategoryNameCHI': `${row[21]}`, 'Currency': `${row[22]}`, 'OriginalPrice': `${row[23]}`, 'DiscountPrice': `${row[24]}`, 'DiscountRate': `${row[25]}`, 'VIPDiscountPrice': `${row[26]}`, 'VIPDiscountRate': `${row[27]}`, 'GOLDVIPDiscountPrice': `${row[28]}`, 'GOLDVIPDiscountRate': `${row[29]}`, 'quantity': `${row[30]}`  }).then((result) => {
                        }).catch((err) => {
                            return page_res.render('product', {
                                error: 'Something went wrong while inserting product data',
                                stores
                            })
                        })
                    }

                    console.log("All Rows Inserted");

                    await db.select().from('products').then(async (result_res) => {
                        return page_res.render('product', {
                            storeData: result_res,
                            stores

                        })
                    }).catch((err)=> {
                        return page_res.render('product', {
                            error: 'Something went wrong while getting product data from database',
                            stores
                        })
                    })
                } else {
                    console.log('WRONG FILE INPUT')
                    page_res.render('product', {
                        error : `${errorCol} doesnot Match!`,
                        stores
                    })

                }
            });
        stream.pipe(csvStream);
    }
}