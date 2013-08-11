// TODO:
// backbone this shit
// make menu expand and collapse
// serialize this page
// get all dropcaps downloaded and into place
// figure out attribution/about stuff
var wayfinder = {
  toggleDropCap: function () {
    var dropCap = $('.dropcap');

    var origText = $('#story p:first').text().trim();

    if (dropCap.length) {
      var match = dropCap.attr('src').match(/([a-z])[0-9]+\.png/);
      dropCap.remove();

      $('#story p:first').text(match[1].toUpperCase() + origText);

    }
    else {
      var text = origText.toLowerCase();
      $('#story p:first').text(origText.substr(1, origText.length));
      $('#story p:first').prepend('<img class="dropcap" src="/static/img/' + text[0] + '1.png">');

    }
  },
  setTheme: function (options) {
    $('body').attr('class', '').addClass(options.theme);
  }
};

$(document).ready(function () {

  var caps = {
    'a': 11
  };

  //init dropcap code
  $('#story').on('click', '.dropcap', function (event) {
    var cap = 'a';
    var src = $(this).attr('src');
    //get number
    var match = src.match(/[0-9]+\.png/);
    var idx = parseInt(match[0].replace('.png', ''), 10);
    //increment
    idx += 1;
    if (idx > caps[cap]) {
      idx = 1;
    }
    //update src
    $(this).attr('src', '/static/img/' + cap + idx + '.png');

  });

  //init menu
  $('.wayfinder').on('click', 'a', function (event) {
    var data = $(this).data();
    if (data.action) {
      wayfinder[data.action](data);
    }
    event.preventDefault();
  });

});

