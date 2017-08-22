$(document).ready(function () {
  // Show more
  $('.show-more').on('click', function (event) {
    event.preventDefault();

    // Change arrow
    $(this).hide();
    $(this).siblings('.show-less').show();

    // Show description and languages
    $(this).siblings('.title').css('font-weight', 'bold');
    $(this).siblings('.description').show();
    $(this).siblings('.languages').show();
  });

  // Show less
  $('.show-less').on('click', function (event) {
    event.preventDefault();

    // Change arrow
    $(this).hide();
    $(this).siblings('.show-more').show();

    // Show description and languages
    $(this).siblings('.title').css('font-weight', 'normal');
    $(this).siblings('.description').hide();
    $(this).siblings('.languages').hide();
  });
});
