
async function updateAllProducts() {

  debugger
  let spinnerImg = document.querySelector('#spinImg')
  //let spinnerText = document.querySelector('#spinText')
  spinnerImg.style.dispaly = 'block'

  let MerchantIDList = document.querySelectorAll("[class='merchant_id']");
  let MerchantSKUIDList = document.querySelectorAll("[class='merchant_sku_id']");
  let quantityList = document.querySelectorAll("[class ='quantity']"); 

  for(let i=0; i<MerchantSKUIDList.length; i++){
    let merID = MerchantIDList[i].innerHTML
    let merSKUid = MerchantSKUIDList[i].innerHTML
    let quantity = quantityList[i].innerHTML
 
    //let raw = [{"warehouseId" : null,"merID":`${merID}`,"merSKUid":`${merSKUid}`,"quantity":`${quantity}`}];

    let formData = new FormData();
    formData.append("merID", merID);
    formData.append("merSKUid", merSKUid);
    formData.append("quantity", quantity);
    //formData.append("get", raw);
    var requestOptions = {
    method: 'POST',
    body: formData,
    //redirect: '/product'
    };

    // fetch("updateAllProductStock",requestOptions).then((response) => {

    //   console.log(response);

    // }).catch((err) => {

    // })
  

  
  fetch('updateAllProductStock', requestOptions).then((response) => {
    //var data= response.text();
    console.log(response);
  }).then((result) => {

    var spinText = document.getElementById('#spinText');
    spinText.textContent = `Product ${i} out of  ${MerchantSKUIDList.length} products completed successfully!`
  }).catch((err) => {
    console.log('errro : ' + err)
  })
}

}