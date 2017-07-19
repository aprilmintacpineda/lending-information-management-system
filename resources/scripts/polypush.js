Array.prototype.stringify = function(inject = null) {
  let string = '';

  this.forEach((value, index, array) => {
    if(inject && index > 0) {
      string += inject + value;
    } else {
      string += value;
    }
  });

  return string;
}

Array.prototype.removeFirst = function() {
  this.shift();
  return this;
}

Array.prototype.addFirst = function(field) {
  this.unshift(field);
  return this;
}