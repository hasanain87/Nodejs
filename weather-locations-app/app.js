const superagent = require('superagent');
const config = require('./config.json');
const inquirer = require('inquirer');

const _listLocations =  async() => {
    
    const response =  await superagent.get(`${config.url}`).set('User-Agent', "superagent")
    return response.body['locations']
  
};



const _fetchLocationType = async (locationId) => {
        const fetchurl=`${config.url}/${locationId}/types`
    
        try {
            const response =  await superagent.get(fetchurl).set('User-Agent', "superagent")
            return response.body
        } catch (error) {
            return error;
        }
       


};


// This function logs to the console the final organized results
// - do not hard code in the function ('fire' and 'forecast')
// - each category must be printed uppercase ex: (FIRE or FORECAST)
// - each location product type name associated to that category must be printed as it was returned from the API
// - use proper looping
const _print = (resultObj) => {

    for (let key in resultObj) {
        
        console.log(key+"\n");
        resultObj[key].forEach(element => {
            console.log("-- "+element+"\n");
        });
        
      
  }

     
};


// This function creates a prompt that displays locations that were return from the API
// - only locations that are NOT null should be displayed (the list should NOT include nulls)
// - the locations shown to the user should be in the format of "City, State" (aka the format that is returned by API)
// - use proper looping
const _displayLocations = (locationObj) => {
    
   const listOfLoc=[]
        for (let i in locationObj) { 
            if (locationObj[i] !== null) {
                listOfLoc.push(locationObj[i])
            }
        }
        return inquirer.prompt([
            {
                type: 'list',
                name: 'answer',
                message: 'Select a location',
                choices: listOfLoc
            }
        ]);
        
       
};





const _organizeTypes = (locationObj) => {
    const validCatagories = ['fire', 'forecast'];
    
       ObjectResult={}
       const item1=validCatagories[0]
       const item2=validCatagories[1]
       const listOfLoc1=[]
       const listOfLoc2=[]

       for (let i in locationObj) { 
            const valueofobje=locationObj[i]["productName"]
            
            if (valueofobje.toLowerCase().includes( item1)) {
                listOfLoc1.push(valueofobje)
                
            }
            if (valueofobje.toLowerCase().includes( item2)){

                listOfLoc2.push(valueofobje)
                
            }
      }
       const firekey=item1.toUpperCase()
       const forcastList=item2.toUpperCase()
        ObjectResult[firekey]=listOfLoc1
        ObjectResult[forcastList]=listOfLoc2
        return ObjectResult

};



// - this MUST call: _listLocations, _displayLocations, _fetchLocationType, _organizeTypes, and _print
async function locations() {
    const listoflocations= await  _listLocations()
   
    const Location=await _displayLocations (listoflocations) 
  
    let useranswerkey=""
    for(let i in listoflocations){
        if (listoflocations[i]===Location['answer']) {    
            useranswerkey=i
        }
    }
    
     const locationInfo= await _fetchLocationType(useranswerkey)
   
    const keyworobj=_organizeTypes(locationInfo['@graph'])

    _print(keyworobj)


}


module.exports = {
    locations
}