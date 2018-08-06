

/*header*/
;(function(){
  var $buy = $('#header .h_m_r_buy');
  var $buyA = $buy.find('a.buy');
  var $buyHide = $buy.find('.hide');
  $buy.hover(function(){
    $buyA.addClass('hover');
    $buyHide.stop().slideDown(300);
  },function(){
    $buyHide.stop().slideUp(300,function(){
      $buyA.removeClass('hover');
    })
  });
})();
/*search*/
(function(){
  var search = $('#nav .nav_search .search').eq(0);
  var lis = $('#nav .nav_search_list li');
  var search_list = $('#nav .nav_search_list').eq(0);
  var ospan = $('#nav .nav_search>span').eq(0);
  search.on('input',function(){
    var value = $(this).get(0).value;
    var _this = $(this);
    search_list.on('mouseleave',function(){
      $(this).css('display','none');
    });
    for(var i = 0;i<lis.length;i++){
      lis.eq(i).on('click',function(){
        _this.get(0).value = $(this).text();
      })
    }
    ospan.on('click',function(){
      var oValue = _this.val();
      window.open("https://www.baidu.com/s?wd="+oValue);
    })
    $(document).on('keyup',function(e){
      var e = e || window.event;
      if(e.keyCode===13){
        var oValue = _this.val();
        window.open("https://www.baidu.com/s?wd="+oValue);
      }
    })
    $.ajax({
      type: 'get',
      url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+value+'&cb=?',
      dataType: "jsonp",
      jsonCallback:'test',
      success: function(json){
        search_list.css('display','block');
        for(var i = 0;i<lis.length;i++){
          lis.eq(i).text(json.s[i]);
        }
      },
      error:function(){
        console.log('fail');
      }
    })
  })
})();
/*nav_main*/
;(function(){
  var nav_lis = $('#nav .nav_menu li');
  var nav_main = $('#nav .nav_menu_main').eq(0);
  var n_m_u = $('#nav .nav_menu_main ul');
  var prehover="",currenthover="";//上一个hover索引和当前hover索引
  var len = nav_lis.length;
  for(var i = 0;i<(len-2);i++){
    (function(i){
      nav_lis.eq(i).hover(function(){
        currenthover = i;
        if(prehover !== ""){
          n_m_u.eq(prehover).css('display',"none");
        }
        prehover = currenthover;
        n_m_u.eq(currenthover).css('display','block');
        nav_main.stop().slideDown(400);
      },function(){
        nav_main.stop().slideUp(400);
      });
      n_m_u.eq(i).hover(function(){
        nav_main.stop().slideDown(400);
      },function(){
        nav_main.stop().slideUp(400);
      })
    })(i);
  }
})();
/*banner*/
;(function(){
  var bar_lis = $('#banner .bar_content li');
  var bar_spns = $('#banner .bar_lis span');
  var bar_btn_l = $('#banner .bar_btnbox .bar_btn_l').eq(0);
  var bar_btn_r = $('#banner .bar_btnbox .bar_btn_r').eq(0);
  var barnum = 0;//储存显示li 索引
  var prenum = 0;
  var time_f = 0;
  bar_btn_r.on("click",function(){
    change("r");
  })
  bar_btn_l.on("click",function(){
    change("l");
  })
  function change(face){//传入方向
    var time = new Date().getTime();
    if((time-time_f)<800){
      return;
    }
    prenum = barnum;
    bar_lis.eq(barnum).fadeOut(300);
    if(face == "r"){
      barnum++;
      barnum%=(bar_lis.length-1);
    }else{
      barnum--;
      if(barnum<0){
        barnum = (bar_lis.length-2);
      }
    }
    bar_lis.eq(barnum).fadeIn(200);
    bar_spns.eq(prenum).removeClass('selected');
    bar_spns.eq(barnum).addClass('selected');
    time_f = time;
    if(bar_lis.eq(prenum).hasClass('item')){
      bar_lis.eq(prenum).removeClass('item');
    }
    prenum = barnum;
  }
  setInterval(function(){
    prenum = barnum;
    change("r");
    ospnbtn(barnum);
    prenum = barnum;
  },20000)
  for(var i = 0;i<bar_spns.length;i++){
    bar_spns.eq(i).attr("index",i);
    bar_spns.eq(i).on('click',function(){
      var num = $(this).attr('index');
      ospnbtn(num);
    })
  }
  function ospnbtn(num){
    barnum = num;
    if(bar_spns.eq(num).hasClass('selected')){return};
      bar_spns.eq(prenum).removeClass('selected');
      bar_spns.eq(num).addClass('selected');
      bar_lis.eq(prenum).fadeOut(300);
      prenum = barnum;
      bar_lis.eq(barnum).fadeIn(200);
   }
})();
/*banner  bar_menu*/
;(function(){
  var b_m_lis = $('#banner .bar_menu li');
  var b_m_i = "";//当前显示的
  for(var i = 0;i<b_m_lis.length;i++){
    b_m_lis.eq(i).hover(function(){
      if($(this).find('.bar_menu_info')){
        b_m_i = $(this).find('.bar_menu_info');
        b_m_i.stop().fadeIn(500);
      }
      b_m_i.hover(function(){},function(){
        $(this).stop().fadeOut(500);
      })
    },function(){
      if(b_m_i){
        b_m_i.stop().fadeOut(500);
      }
    })
  }
})();
/*star*/
(function(){
  var bColorArr = ['red','orange','blue'];
  var oul = $('#star .star_content ul').eq(0);
  var lis = oul.find("li");
  var btns = $('#star .btn span');
  var num = "";
  var btnIndex = 0;
  for(var i = 0;i<lis.length;i++){
    num = i;
    num%=3;
    lis.eq(i).css('border-color',bColorArr[num]);
  }
  btns.eq(0).on('click',function(){
    active(0);
  })
  btns.eq(1).on('click',function(){
    active(1);
  })
  function active(btn_i){
    if(btns.eq(btn_i).hasClass('select')){return};
    var otherbtn = "";
    var transnum = "";
    var currentb = btns.eq(btn_i);
    otherbtn = btn_i?btns.eq(0):btns.eq(1);
    transnum = btn_i?'-1226px':0;
    currentb.addClass('select');
    otherbtn.removeClass('select');
    oul.css('transform','translateX('+transnum+')');
  }
  setInterval(function(){
    btnIndex++;
    btnIndex%=2;
    active(btnIndex);
  },20000);
})();
/*motif_content*/
(function(){
  var lis = $('#hardware .h_cont .h_con_r li');
  for(var i = 0;i<lis.length;i++){
    lis.eq(i).hover(function(){
      $(this).css({"box-shadow":"0 0 20px gray",'transform':'translateZ(10)',"top":"-5px"});
    },function(){
      $(this).css({"box-shadow": "none",'transform': 'none',"top":"0"});
    })
  }
})();
/*match*/
(function(){
  var alllis = $('#match .match_con li');
  var r_ul = $('.match_con_r ul');
  var num = 0;//初始显示索引
  var prenum = 0;
  var info = "";//存放当前li项中的comment
  var olis = $('.match_h_r li');
  r_ul.eq(num).stop().fadeIn(100);
  for(var i = 0;i<olis.length;i++){
    olis.eq(i).attr('oindex',i);
    olis.eq(i).hover(function(){
      if($(this).hasClass('select')){return};
      prenum = num;
      num = $(this).attr('oindex');
      $(this).addClass('select');
      olis.eq(prenum).removeClass('select');
      r_ul.eq(prenum).stop().fadeOut(200);
      r_ul.eq(num).stop().fadeIn(300);
    })
  }
  for(var i = 0;i<alllis.length;i++){
    alllis.eq(i).hover(function(){
      info = $(this).find('.comment').eq(0);
      if(info){
        info.addClass('animate');
      }
      $(this).css({"box-shadow":"0 0 20px gray",'transform':'translateZ(10)',"top":"-5px"});
    },function(){
      if(info.hasClass('animate')){
        info.removeClass('animate');
      }
      $(this).css({"box-shadow": "none",'transform': 'none',"top":"0"});
    })
  }
})();
/* neirong */
(function(){
  var $li1 = $('#neirong li.li1');
  var $link = $('#neirong li.li1 .link a');
  var li1Width = $li1.width();
  var clickTime = 0;
  $li1.hover(function(){
    $(this).find('.btn div').stop().fadeIn(200);
  },function(){
    $(this).find('.btn div').stop().fadeOut(200);
  }).each(function(){
    var index = 0;
    var $tabLi = $(this).find('.tab .tabLi');
    var $btnDiv = $(this).find('.btn div');
    $tabLi.eq(0).addClass('on');
    $tabLi.click(function(){
      $(this).addClass('on').siblings().removeClass('on');
      index = $(this).index();
      $(this).parents('li.li1').find('ul.ul2').stop().animate({marginLeft:-index*li1Width+'px'},300);
    });
    $btnDiv.click(function(){
      if ( new Date() - clickTime >= 300 )
      {
        clickTime = new Date();
        $(this).index()?index++:index--;
        index = Math.max(index,0);
        index = Math.min(index,$tabLi.length-1);
        $tabLi.eq(index).addClass('on').siblings().removeClass('on');
        $(this).parents('li.li1').find('ul.ul2').stop().animate({marginLeft:-index*li1Width+'px'},300);
      }
    }).each(function(){
      this.onselectstart = function(){return false};
    });
  });
  $link.each(function(){
    var color = $(this).parents('li.li1').css('border-top-color');
    $(this).css({
      border : '1px solid '+color,
      color : color
    }).hover(function(){
      $(this).css({
        background:color,
        color:'#fff'
      }); 
    },function(){
      $(this).css({
        border : '1px solid '+color,
        color : color,
        background:'#fff',
      }); 
    });
  });
})();

/* video */
(function(){
 var lis = $('#video li');
 for(var i = 0;i<lis.length;i++){
   lis.eq(i).hover(function(){
    $(this).css({"box-shadow":"0 0 20px gray",'transform':'translateZ(10)',"top":"-5px"});
  },function(){
    $(this).css({"box-shadow": "none",'transform': 'none',"top":"0"});
  })
 }

})();
