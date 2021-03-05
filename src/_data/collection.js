// using js as a data source example
// const items = require('./works.json');
const d3 = require('d3-fetch');
global.fetch = require("node-fetch");
const atAPIKey = 'key62fnTzb3okw5uc'
const atEndpoint = 'https://api.airtable.com/v0/applxNTvlltowDG5C/Sublime%20Miscellany:%20Treasures%20from%20the%20Rare%20Book%20Room';
const atBaseID = 'applxNTvlltowDG5C';
const skipRecords = ['recNfsDZ4a9RcMrjF']

module.exports = async function(){

  let base = await d3.json(atEndpoint, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${atAPIKey}`
    }
  }).catch((err) => { console.log(err); });
  console.log(base.records)
  let tags = new Set(base.records.map(d => d.fields.Group));
  let collection = {};
  collection.items = base.records.filter( (d) => (d.id !== skipRecords[0]) );
  collection.items = collection.items.map((d,i) => {
    d.fields.id = String(i+1).padStart(3,'000');
    if (d.fields.Photos) {
      d.fields.Photos = d.fields.Photos.map( d => d.filename )
    }
    return d.fields;
  });
  collection.tags = [...tags].sort();
  return collection;  
}