async function fetchAndDisplayCountries() {
  const url = 'https://api.restcountries.com/countries/v5';
  const options = {
    method: 'GET',
    headers: {Authorization: 'Bearer rc_live_95e1798cad32478fb42fcbcb73e98b97'}
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json(); 
    
    console.log(json)
    
    // sort an array of countries by comparing area
    let sorted = json.data.objects.sort((a,b) =>  a.area - b.area  ); 

    
    sorted.forEach( country => { 

      console.log(country)
      // dynamically construct a url for a flag
      // based on the ISO code. 
      // https://github.com/mledoze/countries
      // 
      let flagImage = `https://raw.githubusercontent.com/mledoze/countries/master/data/${country?.codes?.alpha_3?.toLowerCase()}.svg`
      
      // make a div to hold each planet
      let div = document.createElement('div') 
      div.classList.add('country')  
      
      div.innerHTML = 
        `<img class="flag" src="${flagImage}">
        <h4>${country?.names?.common}</h4>
        <p>${country?.area} km²</p> 
        <p><b>Lat/Lng</b> ${country?.latlng[0]}°,${country?.latlng[1]}°</p> ` 
      
      document.querySelector('#countries') .appendChild(div)
    })

  } catch (error) {
    console.error(error);
  }
}

fetchAndDisplayCountries();