jQuery(document).ready(function($) {
  var $dropdown, $highlightButtons, $highlights, $menu, $toggle;
  $toggle = $('#nav-toggle');
  $menu = $('#nav-menu');
  $toggle.click(function() {
    $(this).toggleClass('is-active');
    $menu.toggleClass('is-active');
  });
  $dropdown = $('.is-dropdown');
  $dropdown.click(function() {
    $(this).parent('.dropdown, .dropup').toggleClass('is-active');
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.dropdown, .dropup').length) {
      $dropdown.parent('.dropdown, .dropup').removeClass('is-active');
    }
  });
  $('.modal-button').click(function() {
    var target;
    target = $(this).data('target');
    $('html').addClass('is-clipped');
    $(target).addClass('is-active');
  });
  $('.modal-background, .modal-close').click(function() {
    $('html').removeClass('is-clipped');
    $(this).parent().removeClass('is-active');
  });
  $('.modal-card-head .delete, .modal-card-foot .button').click(function() {
    $('html').removeClass('is-clipped');
    $('#modal-ter').removeClass('is-active');
  });
  $highlights = $('.highlight');
  $highlights.each(function() {
    var $el, copy, expand;
    $el = $(this);
    copy = '<button class="copy">Copy</button>';
    expand = '<button class="expand">Expand</button>';
    $el.append(copy);
    if ($el.find('pre code').innerHeight() > 600) {
      $el.append(expand);
    }
  });
  $highlightButtons = $('.highlight .copy, .highlight .expand');
  $highlightButtons.hover((function() {
    $(this).parent().css('box-shadow', '0 0 0 1px #ed6c63');
  }), function() {
    $(this).parent().css('box-shadow', 'none');
  });
  return $('.highlight .expand').click(function() {
    $(this).parent().children('pre').css('max-height', 'none');
  });
});