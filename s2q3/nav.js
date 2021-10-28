

axios = require('axios');

//Require Axios

const fundname  = process.argv[2];
const  execute = async() =>{
  const {data}  = await axios.get('https://codequiz.azurewebsites.net/',{
    headers: {
      Cookie: 'true; hasCookie=true'
    }})

    var table = data.substring( data.indexOf('<table>')+7, data.indexOf('</table>') )
    // table= table.replace(new RegExp('</tr><tr>', 'g'), ',');
    table = table.split('</tr><tr>');
    raw = table.map(e =>{
      return e
      .replace(new RegExp('</td><td>', 'g'), ',')
      .replace(new RegExp('</th><th>', 'g'), ',')
      .replace(new RegExp('<td>', 'g'), ' ')
      .replace(new RegExp('</td>', 'g'), ' ')
      .replace(new RegExp('<tr>', 'g'), ' ')
      .replace(new RegExp('</tr>', 'g'), ' ')
      .replace(new RegExp('<th>', 'g'), ' ')
      .replace(new RegExp('</th>', 'g'), ' ')
      .split(',')
      .map(entry => entry?.trim())
    })

    const found = raw?.find(e=> e[0] == fundname);
    console.log(found[raw[0].indexOf('Nav')]);
    

}

execute();