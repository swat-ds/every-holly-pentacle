// using js as a data source example
const works = require('./works.json');

module.exports = function(){
  return works.map(d => d.fields)
}