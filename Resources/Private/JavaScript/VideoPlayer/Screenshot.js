const $ = require('jquery');

function renderScreenshot(videoDomElement) {
  // add canvas overlay to DOM
  var domElement = $("<div id='screenshot-overlay'><span class='close-screenshot-modal icon-close'></span><canvas id='screenshot-canvas'></canvas></div>");
  $('body').append(domElement);

  // bind close action
  $('.close-screenshot-modal').bind('click', function () {
    $('#screenshot-overlay').detach();
  });

  // lets go
  drawCanvas(videoDomElement);
}

function drawCanvas(videoDomElement) {
  var canvas, context
  var stringArray = [], infoString = '';

  canvas = document.getElementById('screenshot-canvas');
  var metadataArray = generateMetadataObject();

  for (var i = 0; i < metadataArray.screenshotFields.length; i++) {
    if (typeof (metadataArray.metadata[metadataArray.screenshotFields[i]]) === 'string') {
      stringArray.push(metadataArray.metadata[metadataArray.screenshotFields[i]]);
    }
  }

  for (var i = 0; i < stringArray.length; i++) {
    if ((stringArray.length - 1) !== i) {
      infoString += stringArray[i] + ' / ';
    } else {
      infoString += stringArray[i];
    }
  }

  canvas.width = videoDomElement.videoWidth;
  canvas.height = videoDomElement.videoHeight;

  context = canvas.getContext('2d');

  context.drawImage(videoDomElement, 0, 0, canvas.width, canvas.height);

  context.font = '25px Arial';
  context.textAlign = 'end';
  context.fillStyle = "#FFFFFF";
  context.shadowBlur = 5;
  context.shadowColor = "black";
  context.fillText(infoString, canvas.width - 10, canvas.height - 10);

  canvas.style.width = '80%';
  canvas.style.height = 'auto';
}

function generateMetadataObject() {
  var dataDomElement = $('#metadata');
  var metadataObject = {};
  metadataObject.metadata = [];
  metadataObject.screenshotFields = dataDomElement.data('screenshotfields').split(',');

  for (var i = 0; i < dataDomElement.children().length; i++) {
    if (dataDomElement.children()[i].value.length) {
      metadataObject.metadata[dataDomElement.children()[i].id] = dataDomElement.children()[i].value;
    }
  }
  return metadataObject;
}

module.exports = { renderScreenshot };
