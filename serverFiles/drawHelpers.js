var DrawingConfigs = function(){
  
};

DrawingConfigs.prototype.generateRandomColor = function(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

module.exports = new DrawingConfigs();


// TODO: Refactor to export only this one function
// Will need to refactor a few lines in app.js as well