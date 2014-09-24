// Method for adding key value pairs to a list.
appendKeyValueToList = function(listId, key, value) {
  $(listId).append('<li>{' + key + ': ' + value + '}</li>');
}

// Method for adding data to the 'Saved Data' list.
addToDataList = function(value) {
  // Check to see if the data is a string or an object
  if (typeof value == 'string') {
    $('#dataList').append('<li>' + value + '</li>');
  } else {
    $.each(value, function(key, value) {
      appendKeyValueToList('#dataList', key, value);
    });
  }
}

// Update the status when saving data
setStatus = function(status) {
  $('#status').text(status);
}

// Event handler for saving a string.
$('#saveStringForm').on('submit', function() {
  stringToSave = $('#stringInput').val();
  if (stringToSave == "") {
    setStatus('Please enter a string');
  } else {
    setStatus('Saving string...');
    /*
    Pass the string to BL.createData to save it.
    The second paramater to BL.createData is a function
    that is called once the data is created successfully.
    */
    BL.createData(stringToSave, function() {
      setStatus('');
      addToDataList(stringToSave);
    });
  }
  return false;
});

// Event handler for saving an object.
$('#saveObjectForm').on('submit', function() {
  key = $('#keyInput').val();
  val = $('#valueInput').val();
  if (key == "" || val == "") {
    setStatus('Please enter a key and a value');
  } else {
    objectToSave = {}
    objectToSave[key] = val
    setStatus('Saving object...');
    /*
    Pass the object to BL.createData to save it.
    The second paramater to BL.createData is a function
    that is called once the data is created successfully.
    */
    BL.createData(objectToSave, function() {
      setStatus('');
      self.addToDataList(objectToSave);
    });
  }
  return false;
});

 /*
Retrieve static content with Bl.getStaticContent.
Static content is stored as an object with properties
equal to the identifiers of each piece of content. Each property
contains an array with the content corresponding
to each update of the app.
*/
savedContent = BL.getStaticContent();
$.each(savedContent, function(identifier, contentArray) {
  /*
  Add the most recent static content update by accessing the first
  element in the array for each piece of content.
  */
  if (typeof contentArray  != 'undefined') {
    appendKeyValueToList('#staticContentList', identifier, contentArray[0]);
  }
});

 /*
Retrieve saved data with Bl.getData.
Data is stored as an array of objects with
properties id, data, and created_at. The data property
can either be a string or an object.
*/
savedData = BL.getData();
$.each(savedData, function(index, value) {
  /*
  Add each data property (string or object) to
  the 'Saved Data' list.
  */
  addToDataList(value.data);
});
