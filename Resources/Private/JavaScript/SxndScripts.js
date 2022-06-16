import $ from 'jquery';

import './vendor/modernizrCustom';
import './vendor/jquery.cookiebar';
import 'magnific-popup';


/*
 *
 * JS functions
 * ================================================
 * a few additional calls to
 * enhance the user expierience
 *
 */


$(function () {

  // sub entry toggle in list views
  $('.tx-dlf-morevolumes, .tx-dlf-hidevolumes').on('click', function (event) {
    $(this).parent().toggleClass('tx-dlf-volumes-open').find('.tx-dlf-volume').slideToggle();
  });

  $('button.nav-open').on('click', function (event) {
    setTimeout(function () {
      $('body').addClass('menu-open');
    }, 25);
  });
  $('.perspective, button.nav-close').on('click', function (event) {
    $('body').removeClass('menu-open');
  });

  // retrieve image aspect ratio and add class
  $('figure').each(function () {
    const aspectRatioClass = ($(this).find('img').attr('height') / $(this).find('img').attr('width') < 1) ? 'landscape' : 'portrait';
    $(this).addClass(aspectRatioClass);
  });

  // Wrap all tables into a responsive element
  $('.contenttable, .ce-table').each(function () {
    $(this).wrap('<div class="table-responsive" />');
  });

  // Enable cookie warning
  $.cookieBar({
    fixed: true,
    message: 'Diese Website nutzt Cookies. Mit der weiteren Nutzung dieser Webseite erklären Sie sich damit einverstanden, dass wir Cookies verwenden.<br>',
    acceptText: 'Schließen.',
    policyButton: false
  });

  // animated scroll to top
  $('a.totop').on('click', function () {
    $('a.totop').removeClass('active');
    $('html,body').animate({scrollTop: 0}, 600);
    return false;
  });

  // Activate to top link after scrolling a little bit
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $('a.totop').addClass('active');
    } else {
      $('a.totop').removeClass('active');
    }
  });

  // Dirty Headline solution for LDPs member listings
  $('.ldp-member-listing figure').each(function () {
    const titleDuplicate = ($(this).find('a')[0]) ? '<a href="' + $(this).find('a').attr('href') + '" target="_blank">' + $(this).find('a').attr('title') + '</a>' : $(this).find('img').attr('title');
    if (titleDuplicate) {
      $(this).find('figcaption').prepend('<h4>' + titleDuplicate + '</h4>');
    }
  });

  // Also dirty but fast. Set width of caption to the same value as the image above
  $('.pageresource-image').each(function () {
    const getWidth = $(this).find('.pageresource-container').width();
    $('.pageresource-image figcaption').css('width', getWidth);
  });

  // Detect single news display and add body class
  if ($('.news-single')[0]) {
    $('body').addClass('news-details');
  }

  // enable magnific lightbox
  $('.ce-image, .ce-textpic').each(function () {
    $(this).find('a[href$="jpg"], a[href$="png"]').magnificPopup({
      type: 'image',
      tClose: 'Schließen (ESC)',
      tLoading: 'Lade #%curr%...',
      mainClass: 'mfp-img-mobile',
      closeBtnInside: false,
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1],
        arrowMarkup: '<div title="%title%" class="mfp-ctrls btn-%dir%"><i class="arrow-%dir%"></i></div>',
        tPrev: 'Bild zurück (Pfeiltaste links)',
        tNext: 'Bild vor (Pfeiltaste rechts)',
        tCounter: '%curr% von %total%',
      },
      image: {
        tError: 'Das Bild #%curr% konnte nicht geladen werden.',
        titleSrc: function (item) {
          let imageDesc = '';
          if (item.el.find('img').attr('title')) {
            imageDesc += '<h3>' + item.el.find('img').attr('title') + '</h3>';
          }
          if (item.el.parent().find('figcaption')[0]) {
            imageDesc += '<p>' + item.el.parent().find('figcaption').html() + '</p>';
          }
          return imageDesc;
        }
      },
      zoom: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out'
      }
    });
  });

  // toggle sub lists in DLF listview
  $('.tx-dlf-listview ol.tx-dlf-abstracts > li').each(function () {
    if (!$(this).find('ol.tx-dlf-volume')[0]) {
      $(this).addClass('no-subs');
    }
  });
  $('.tx-dlf-listview ol.tx-dlf-abstracts .tx-dlf-morevolumes').on('click', function () {
    $(this).parent().toggleClass('open');
  });

  // Fixes display bug in IE browsers which don't support the object-fit feature
  if (!Modernizr.objectfit) {
    $('figure > a, .collection-element > a').each(function () {
      const imageUrl = $(this).find('img').attr('src');
      if (imageUrl) {
        $(this).css('backgroundImage', 'url(' + imageUrl + ')').addClass('fix-object-fit');
      }
    });
  }

});
