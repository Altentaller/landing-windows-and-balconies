$(function () { /* show more works */
  $(".works__item").slice(0, 3).show();
  $("body").on('click', '.load-more', function (e) {
    e.preventDefault();
    $(".works__item:hidden").slice(0, 3).slideDown();
    if ($(".works__item:hidden").length == 0) {
      $(".load-more").css('visibility', 'hidden');
    }
    $('html,body').animate({
      scrollTop: $(this).offset().bottom
    },);
  });
});

$(function() { /*scroll to top */
  $('.scrollup').click(function() {
    $("html, body").animate({
      scrollTop:0
    },1000);
  })
})
$(window).scroll(function() {
  if ($(this).scrollTop()>400) {
    $('.scrollup').fadeIn();
  }
  else {
    $('.scrollup').fadeOut();
  }
});


/* send orders */
$(function() {
  $('input[name=tel]').mask('+7 (000) 000-00-00');
});

$(document).ready(function () {
  $('form').submit(function () {
      var formID = $(this).attr('id');
      var formNm = $('#' + formID);
      $.ajax({
          type: 'POST',
          url: 'mailer/smart.php', 
          data: formNm.serialize(),
          success: function (data) {
            $(formNm).find("input").val("");
            $(formNm).find('.form-thanks').fadeIn('slow');
            $(formNm).find('p').fadeOut('slow');
          }
      });
      return false;
  });
});


/* scroll to blocks */
$(function(){
  $("a[href^='#']").click(function(){
          var _href = $(this).attr("href");
          $("html, body").animate({scrollTop: $(_href).offset().top-50});
          return false;
  });
});

/* show mob nav */
const navMob = document.querySelector('.navbarMobile')
$(".navbar-toggler").click(function(e) {
  e.preventDefault();
  navMob.classList.add('navbarMobile-active');
})
$(document).mouseup(function (e) { /* hide mobNav if clicked on page */
  var div = $(".navbarMobile"); 
  if (!div.is(e.target)
      && div.has(e.target).length === 0) {
      div.removeClass("navbarMobile-active")
  }
});