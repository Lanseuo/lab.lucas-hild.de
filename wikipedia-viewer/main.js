$(document).ready(function () {
  var api = 'hello';
  $('#results').hide();

  $('#search').click(function () {
    $(this).hide();
    $('#searchbar').show();
  });

  $('#searchbar').keydown(function (e) {
    if (e.keyCode == 13) {
      var query = ($('#searchbar').val());
      $.getJSON('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=' + query, function (json) {
        showResults(json.query.pages);
      });
    }
  });

  function showResults(results) {
    var html = '';

    $.each(results, function (index, value) {
      html += '  <a class="result" href="https://en.wikipedia.org/?curid=' + value.pageid + '" target="_blank">';
      html += '    <h3 class="result-title">' + value.title + '</h3>';
      html += '    <p class="result-info">' + value.extract + '</p>';
      html += '  </a>';
    });

    $('#results').html(html);
    $('#results').show();
    $('#random').hide();
  }
});
