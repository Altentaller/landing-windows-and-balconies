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
