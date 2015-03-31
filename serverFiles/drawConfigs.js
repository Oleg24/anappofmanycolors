var DrawingConfigs = function(){
  this.color;
}

DrawingConfigs.prototype.generateRandomColor = function () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    this.color = color;
    return this.color;
  }

module.exports = new DrawingConfigs();