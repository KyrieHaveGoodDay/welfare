  function AuctionOne(data, DivId) {
    let str = '';
    // 按鈕
    let btnn = 'img/commodity_btn.png';
    data.forEach((item, index) => {
      // 時間到的話做什麼事情...
     
      if (shop1) {
        // console.log('時間到了true');
        item.OnOff = false;
      } else {
        // console.log('時間還沒到false');
      }

      if (shop2) {
        // console.log('時間到了true');
        item.OnOff2 = false;
      } else {
        // console.log('第二區商品，時間還沒到false');
      }
     

      
      if (item.OnOff) {
        // $('.commodity_btn').attr('src','img/EndEvent.png')
        btnn = 'img/commodity_btn.png';
        str +=
          `
          <div class="bidding_card">
          <a href="${item.link}" target="_blank"">
            <img class="d-block card_img" src="img/${item.img}" alt="">
            <p>${item.title}</p>
            <p>${item.text}</p>
            <img class="commodity_btn " src="${btnn}" alt=""></a>
          </div>
          `;
      } else if(item.OnOff2){
        btnn = 'img/commodity_btn.png';
        str +=
          `
          <div class="bidding_card">
          <a href="${item.link}" target="_blank"">
            <img class="d-block card_img" src="img/${item.img}" alt="">
            <p>${item.title}</p>
            <p>${item.text}</p>
            <img class="commodity_btn" src="${btnn}" alt=""></a>
          </div>
          `;
      }else {
        btnn = 'img/EndEvent.png';
        str +=
          `
          <div class="bidding_card Nogogo">
          <a href="${item.link}" target="_blank">
            <img class="d-block card_img" src="img/${item.img}" alt="">
            <p>${item.title}</p>
            <p>${item.text}</p>
            <img class="commodity_btn Nogogo" src="${btnn}" alt=""></a>
          </div>
          `;
      }
      

    });
    document.querySelector(`${DivId}`).innerHTML = str;

  }
  AuctionOne(commmodity1, '#biddind_card1');
  AuctionOne(commmodity2, '#biddind_card2');


  

