$(function () {
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