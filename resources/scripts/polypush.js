/**
 * Array prototype functions
 */
Array.prototype.stringify = function(inject = null) {
  let string = '';

  this.forEach((value, index) => {
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

Array.prototype.sum = function(field = null) {
  let sum = 0;

  this.forEach(value => {
    if(value.constructor == Object) {
      sum += Number(value[field]);
    } else {
      sum += Number(value);
    }
  });

  return sum;
}

Array.prototype.sumIf = function(callback, field = null) {
  let sum = 0;

  this.forEach(value => {
    if(callback(value)) {
      if(value.constructor == Object) {
        sum += value[field];
      } else {
        sum += value;
      }
    }
  });

  return sum;
}

Array.prototype.countIf = function(callback) {
  let count = 0;

  this.forEach(value => {
    if(callback(value)) count++;
  });

  return count;
}