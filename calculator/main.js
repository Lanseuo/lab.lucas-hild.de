$(document).ready(function () {
  var firstOne = true;
  var currentNumber;
  var currentSymbol;
  var numbers = [];
  var symbols = [];

  // AC button
  $('.ac').click(function () {
    $('#display #value').text('');
    $('#display #preview').text('');

    firstOne = true;
    currentNumber = undefined;
    currentSymbol = undefined;
  });

  // CE button
  $('.ce').click(function () {
    var displayValue = $('#display #value').text();
    displayValue = displayValue.split('');
    displayValue = displayValue.splice(0, displayValue.length - 1);
    displayValue =  displayValue.join('');
    $('#display #value').text(displayValue);
  });

  // number button
  $('.number').click(function () {
    var newNum = $(this).text();
    $('#display #value').text($('#display #value').text() + newNum);
  });

  // symbol button
  $('.symbol').click(function () {
    if (firstOne) {
      currentNumber = parseFloat($('#display #value').text());
      currentSymbol = $(this).text();
      firstOne = false;
    } else {
      switch (currentSymbol) {
        case '+':
          currentNumber = currentNumber + parseFloat($('#display #value').text());
          break;
        case '-':
          currentNumber = currentNumber - parseFloat($('#display #value').text());
          break;
        case '*':
          currentNumber = currentNumber * parseFloat($('#display #value').text());
          break;
        case '/':
          currentNumber = currentNumber / parseFloat($('#display #value').text());
          break;
      }
      currentSymbol = $(this).text();
    }

    $('#display #value').text('');
    $('#display #preview').text(currentNumber);
    console.log(currentNumber);
  });

  // result button
  $('.result').click(function () {
    switch (currentSymbol) {
      case '+':
        currentNumber = currentNumber + parseFloat($('#display #value').text());
        break;
      case '-':
        currentNumber = currentNumber - parseFloat($('#display #value').text());
        break;
      case '*':
        currentNumber = currentNumber * parseFloat($('#display #value').text());
        break;
      case '/':
        currentNumber = currentNumber / parseFloat($('#display #value').text());
        break;
    }
    $('#display #value').text(currentNumber);

    firstOne = true;
    currentNumber = undefined;
    currentSymbol = undefined;
    $('#display #preview').text('');
  });

});
