let shop1 = false;
let shop2 = false;
// new
(function () {
  const normal = {
    data: {
      windowWidth: 0,
      windowScrollTop: 0,
      rightNavOffsetTop: 0,

    },
    Love:{
      
    },

    // 右邊 Go top 按鈕
    goTopShow() {
      this.data.windowScrollTop >= 100
        ? $('.goTop').addClass('show')
        : $('.goTop').removeClass('show');
    },

    // 右邊 Go top click
    goTopEvt() {
      $('.goTop').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop: '0px' }, 300);
      });
    },

    // 錨點點擊滑動位置
    hashLink() {
      $('a.hash[href^="#"]').on('click', function (e) {
        e.preventDefault();
        const headerH = $('.header').height();
        const sideNavH = $('.side-nav__right').height() || 0;
        const targetTop = $($(this).attr('href')).offset().top;
        const scrollPos =
          normal.data.windowWidth < 768 ? targetTop - headerH - sideNavH : targetTop;
        $('html, body').stop().animate(
          {
            scrollTop: scrollPos,
          },
          300
        );
      });
    },

    // [桌機] 側邊選單 收合
    sideNavEvent() {
      const $sideNav = $('.side-nav');
      $sideNav.on('click', '.side-nav__btn > a', function (e) {
        e.preventDefault();
        $(this).parents('.side-nav').toggleClass('side-nav--hide');
      });
    },

    // [桌機] 右選單底 輪播 / 單一貼紙判斷
    rightNavSlider() {
      let rightSwiper = new Swiper('.right-swiper', {
        autoplay: {
          disableOnInteraction: false,
        },
        loop: true,
        init: false,
      });
      $('.right-swiper .swiper-slide').length > 1 && rightSwiper.init();
    },

    // [手機] 右選單 滾動置頂
    rightNavFixedTop() {
      if (this.data.windowScrollTop > this.data.rightNavOffsetTop) {
        $('.side-nav__right').addClass('fixed');
        $('.wrap').addClass('rightNavFixed');
      } else {
        $('.side-nav__right').removeClass('fixed');
        $('.wrap').removeClass('rightNavFixed');
      }
    },


    // [手機] 底部選單面版(後台)
    footerBoard() {
      // 手機底部選單
      const $SubMenuMobile = $('#SubMenuMobile'); // 分會場 面版外框
      const $SubMenuMobileUl = $('#SubMenuMobile ul'); // 分會場 面版選項
      let tl;

      // open board
      $('.footer-board__btn[data-btn]').on('click', function (e) {
        if (!e.target.classList.contains('footer-board__btn')) {
          return;
        }
        tl = gsap.timeline();
        const board = $(this).data('btn');
        const targetCloseBtn = $(`[data-close="${board}"]`);
        const targetBoard = $(`[data-board="${board}"]`);
        const targetBoardUl = targetBoard.find('ul');
        const targetBoardHeight = targetBoard.height();
        const targetBtn = $(this).find('.txt');
        const boardBtns = $('.footer-board__btn .txt');

        $('body').addClass('board--show');
        tl.to(targetBtn, { duration: 0.3, rotate: 90, opacity: 0 });
        tl.to(boardBtns, { duration: 0.1, scale: 0, opacity: 0, ease: 'back.in(2)' }, 0.08);
        tl.to(targetBoard, { duration: 0.2, y: 0 }, 0.12);
        tl.to(
          targetCloseBtn,
          { duration: 0.2, y: -(targetBoardHeight + 10), ease: 'back.out(1)' },
          0.18
        );
        tl.to(targetBoardUl, { duration: 0.3, y: 0, opacity: 1 }, 0.2);
      });

      // close event
      $('.wrap').on('click', (e) => {
        if (e.target.classList.contains('wrap') || e.target.classList.value === 'board--close') {
          closeBoard();
        }
      });

      // close board
      function closeBoard() {
        $('body').removeClass('board--show');
        tl.reverse();
      }
    },

    // 桌手 底部輪播
    footerSlider() {
      let footerSlider = new Swiper('.footer-slider > .swiper', {
        autoplay: {
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 5,
        loop: true,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      });
    },

    // window scroll event
    windowScroll() {
      $(window)
        .on('scroll', () => {
          this.data.windowScrollTop = $(window).scrollTop();
          // 右側 go top 按鈕
          this.goTopShow();
          // 右選單手機滾動置頂
          this.data.windowWidth < 768 && this.rightNavFixedTop();
        })
        .scroll();
    },
    // 時間判斷
    Times() {
      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      // 目標時間1/6(四)
      let myb = "2022/1/6 20:59:59";
      // 目標時間1/5(三)
      let wait = "2022/1/5 20:59:59";
      let timeout = new Date(wait).getTime();
      // 目標時間轉成毫秒
      let countDown = new Date(myb).getTime();

      // 獲得現在時間的毫秒
      let now = new Date().getTime();

      // 1/5號
      let timeisOver = timeout - now;
      // 1/6號
      let distance = countDown - now;




      // 設定目標時間到達後要做的事情

      // 1/5號 第一競標區
      if (timeisOver < 0) {
        shop1 = true
      } else {
        // console.log('第一區商品時間還沒到');
      }

      // 1/6號 第二競標區含上面三個毛點
      if (distance < 0) {
        // console.log('時間到了');
        for (let i = 1; i <= 3; i++) {
          // 三個毛點關閉
          $('#btnMenu' + i + '>img').attr('src', 'img/btn0' + i + '_off.png')
          $('#btnMenu' + i + '').css('pointer-events', 'none')
        }
        // 第二區商品開關
        shop2 = true;
        // console.log(all);
      } else {
        // console.log('第二區商品，時間還沒到');
      }
    },
    // load跟氣球動畫
    loadAni() {
     

      setTimeout(()=> {
        $(".load-warp").fadeOut(500);
        this.titleAni();
        gsap.from('.bear1-balloon', { duration: 2, y: '-100%', onComplete:()=>{
          setInterval(()=>{
            
            this.boll();
          },1000)
        } })
      }, 1000);
      // ani...
     
      
      // console.log(translateNum);
    },
    // 氣球動畫
    boll(){
      let translateNum =Math.floor(Math.random()*25);
      let allWidth = $(window).width();
      if ( allWidth <= 414) {
       translateNum =Math.floor(Math.random()*15);
      }
      // gsap.from('.bear1-balloon',{duration:2,y:'-100%'})
      
      // console.log(translateNum);
        let t1 = gsap.timeline({})
        t1.to('.bear1-balloon', { duration: 2, y: translateNum, yoyo: true, repeat: -1 })
       
        
    
    },
    // 標題動畫
    titleAni(){
      let t7 = gsap.timeline({delay:0.5});
      t7.to('.title_top1 , .title_top2 , .title_btm',{duration:1 , opacity:1 , repeat:1})
        .to('.title_mid',{duration:0.5,scale:1, ease:"Bounce.easeOut"},0.5)
        .to('.title_top3',{duration:1, rotate:360 ,scale:1, ease:"Bounce.easeOut"},0.7)
        .to('.title_mid',{duration:0.1,scale:1.2, yoyo:true , repeat:1})
        // .to('.title_mid',{duration:0.1,scale:1,})
    },
    
    
    // 愛心
    InfinityLoveLeft() {
      let icon1 = $('<img class="love_L_icon1" src="img/love_icon1.png" alt="">');
      let icon2 = $('<img class="love_L_icon2" src="img/love_icon2.png" alt="">');
      let icon3 = $('<img class="love_L_icon3" src="img/love_icon3.png" alt="">');
      let iconNum = Math.floor(Math.random() * 15);
      let bearWidth = $('.pcbear02_box').width();
      
      // let bearWidthStart = Math.floor(Math.random() * bearWidth * 0.9);
      // 結束座標
      let bearWidthEnd = Math.floor(Math.random() * bearWidth * 0.9 );
      // 左半邊
      let bearWidthStart = Math.floor(Math.random() * bearWidth * 0.9 );
      // 愛心寬度 
      let m = 20;
      let n = 10;
      var widthNum = Math.floor(Math.random() * (m - n + 1) + n);
      // z軸
      let Zm = 1;
      let Zn = -1;
      var Znum = Math.floor(Math.random() * (Zm - Zn + 1) + Zn);
      // 角度
      let Rm = 20;
      let Rn = -20;
      var Zrotate = Math.floor(Math.random() * (Rm - Rn + 1) + Rn);


      // console.log(bearWidthRightStart);
      if (iconNum <= 4) {
        $('#pcbear02_box').append(icon2);
      } else if (iconNum <= 9) {
        $('#pcbear02_box').append(icon3);
      } else if (iconNum <= 15) {
        $('#pcbear02_box').append(icon1);
      }
      gsap.set(icon1, {width:''+widthNum+'%',zIndex:Znum , top: '70%', left: bearWidthStart ,rotate:Zrotate})
      gsap.set(icon2, {width:''+widthNum+'%',zIndex:Znum , top: '70%', left: bearWidthStart ,rotate:Zrotate})
      gsap.set(icon3, {width:''+widthNum+'%',zIndex:Znum , top: '70%', left: bearWidthStart ,rotate:Zrotate})

      // bearWidthEnd
      let t1 = gsap.timeline({});
      t1.to(icon1, { duration: 2, top: '-20%', left: bearWidthEnd })
        .to(icon1, { duration: 1, opacity: 0, onComplete: function () { icon1.remove(); } }, 1)
      let t2 = gsap.timeline({});
      t2.to(icon2, { duration: 2, top: '-20%', left: bearWidthEnd })
        .to(icon2, { duration: 1, opacity: 0, onComplete: function () { icon2.remove(); } }, 1)
      let t3 = gsap.timeline({});
      t3.to(icon3, { duration: 2, top: '-20%', left: bearWidthEnd })
        .to(icon3, { duration: 1, opacity: 0, onComplete: function () { icon3.remove(); } }, 1)

    },


    // init
    init() {
      this.data.windowWidth = $(window).width();
      this.data.rightNavOffsetTop = $('.side-nav__right').offset().top;

      // event function
      this.windowScroll();
      this.goTopEvt();
      this.hashLink();

      this.footerSlider();
      this.Times();
      this.loadAni();
      setInterval(() => {
        // this.InfinityLoveRight();
        this.InfinityLoveLeft();
      },500);
      // setInterval(()=>{
      //   this.boll();
      // },1000)
      
      

     

      if (this.data.windowWidth < 768) {
        // this.footerBoard();
      } else {
        this.sideNavEvent();
        this.rightNavSlider();
      }
    },
  };
  normal.init();
})();

