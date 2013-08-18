/* globals Backbone */
// TODO:
// make menu expand and collapse
// get all dropcaps downloaded and into place
// figure out attribution/about stuff
// make app to tie everything together
var Journal = Backbone.Model.extend({
  defaults: {
    title: 'Today I learned...',
    content: '<p>Today I learned something new.</p>',
    timestamp: Date.now(),
    theme: 'light',
  }
});


var JournalView = Backbone.View.extend({
  el: 'body',

  events: {
    'click .toolbar li': '_handleMenuClick',
    'keypress .story': '_updateContent',
    'keypress .title': '_updateTitle',
    'click .story .dropcap': '_dropcapCycle'
  },

  initialize: function () {
    this.$story = this.$el.find('.story').first();
    this.$title = this.$el.find('.title').first();
    var self = this;
    this.$story.on('click', '.dropcap', function (event) { self._dropCapCycle(event) });
  },

  _handleMenuClick: function (event) {
    var data = $(event.target).data();
    if (data.action) {
      this[data.action](data);
    }
    event.preventDefault();
  },

  _updateContent: _.debounce(function (event) {
    this.model.set('content', this.$story.html());
  }, 500),

  _updateTitle: _.debounce(function (event) {
    this.model.set('title', this.$title.html());
  }, 500),

  setTheme: function (options) {
    $('body').attr('class', '').addClass(options.theme);
  },

  toggleDropCap: function () {
    var p = this.$story.find('p:first');
    if (p.length) {
      var dropCap = $('.dropcap'),
          origText = p.text().trim();

      if (dropCap.length) {
        var match = dropCap.attr('src').match(/([a-z])[0-9]+\.png/);
        dropCap.remove();

        p.text(match[1].toUpperCase() + origText);

      }
      else {
        var text = origText.toLowerCase();
        p.text(origText.substr(1, origText.length));
        p.prepend('<img class="dropcap" src="/static/img/' + text[0] + '1.png">');
      }
    }
    this._updateContent();
  },

  _dropCapCycle: function (event) {
    var src = $(event.target).attr('src'),
        match = src.match(/([a-z])([0-9]+)\.png/),
        letter = match[1],
        idx = parseInt(match[2], 10);


    //increment
    idx += 1;
    if (idx > this.caps[letter]) {
      idx = 1;
    }

    //update src
    $(event.target).attr('src', '/static/img/' + letter + idx + '.png');
  },

  caps: {
    a: 11
  }
});

var page = new Journal();
var view = new JournalView({model: page});

