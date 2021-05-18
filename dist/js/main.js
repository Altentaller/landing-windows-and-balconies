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