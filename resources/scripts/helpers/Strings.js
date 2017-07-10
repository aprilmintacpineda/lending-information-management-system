export function ucfirst(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export function ucwords(value) {
  let result = '';
  let words = value.split(' ');

  words.forEach((word, index) => {
    result += ucfirst(word);

    if(index < words.length - 1) {
      result += ' ';
    }
  });

  return result;
}