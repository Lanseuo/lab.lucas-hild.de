$(document).ready(function () {
  newVideo();
});

function newVideo() {
  $.getJSON('videos.json', function (data) {
    var i = Math.floor(Math.random() * (data.length - 0 + 1));
    console.log(i);
    while ($('h3').text() == data[i].name) {
      i = Math.floor(Math.random() * (data.length - 0 + 1));
    }

    document.title = data[i].name + ' | Pull the Plug';
    $('h3').text(data[i].name);
    $('#video').html('<iframe width="728" height="409.5" src="https://www.youtube.com/embed/' +
      data[i].url + '" frameborder="0" allowfullscreen></iframe>');
  });
}
