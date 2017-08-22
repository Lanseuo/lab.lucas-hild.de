function convertUnit() {
  // Make output visible
  $("#gramsOutput").show();

  // Get value from input
  var kilograms = $("#kilogramsInput").val();

  // Close output if no value
  if (kilograms == 0) {
    $("#gramsOutput").hide();
  }

  grams = kilograms * 1000

  $("#gramsOutputValue").text(grams);
}
