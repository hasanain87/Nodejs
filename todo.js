// 1)
const websites = [
    {
        site: 'yahoo.com',
        responseTime: 50,
        unit: 'ms'
    },
    {
        site: 'google.com',
        responseTime: 10,
        unit: 'ms'
    },
    {
        site: 'reddit.com',
        responseTime: null,
        unit: 'ms'
    },
    {
        site: 'slack.com',
        responseTime: 80,
        unit: 'ms'
    },
    {
        site: 'github.com',
        responseTime: 30,
        unit: 'ms'
    }
];


//an  array that hold the Responses and No Response
const  callbackResult={"Responses":[],"NoResponse":[]}

// counter of element
let count=0

const  checkResponseTime =(website, callaback)=>{
      
               const {site,responseTime=0}=website
          
                 setTimeout(function() {
                     const error= !responseTime ? `${site}` : null;
                      callaback (error, {site: ` ${site}`, responseTime: `${responseTime}` });

                            },responseTime);  
                        };
        
         const websiteResponseTimes= website=>{
            website.forEach(website => { 
                    // callback
                    checkResponseTime (website,(err, result) => {
                             // handle error and result
                                if (!err) {  
                                    count++;
                                    callbackResult["Responses"].push( result )
                        
                                 }else{
                                    count++;
                                    callbackResult["NoResponse"].push( err )
                                  
                                 }   
                                 if (count===websites.length){
                                  
                                    console.log(callbackResult);
                                }           
                    });

                        
            });
                 
        };
  

websiteResponseTimes(websites);


// 2)

const database = [
    {
        id: 1,
        entry: 'Space X',
        twitter: '@spacex'
    },
    {
        id: 2,
        entry: 'NASA',
        twitter: null
    },
    {
        id: 3,
        entry: 'Apple',
        twitter: '@apple'
    },
    {
        id: 4,
        entry: 'Microsoft',
        twitter: '@microsoft'
    },
    {
        id: 5,
        entry: 'Reddit',
        twitter: null
    }
];

const  databases_result={"found":[],"missing":[]}

let counter=0
const bucketTwitters = account => {
    const { id, entry,twitter} = account;
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            const error = !twitter ? `${twitter} is null` : null;
            
            if (error) {
                reject({ error });
            } else {
                resolve({ success: `${entry} is ready ` });
            }
            
           

        }, 10);
        
    });
    
};


const loopAccountsPromises = databases => {

    databases.forEach(database => {
        bucketTwitters (database)
            .then(result => {
                counter++
                databases_result['found'].push(database)
                if (counter===5){
                    console.log(databases_result);
                    
                }  

            })
            .catch(error => {
                counter++
                databases_result['missing'].push(database)
                if (counter===5){
                    console.log(databases_result);
                    
                }  
                
             
            });                         
          });

    };
//loopAccountsPromises(database);


// 3)



const loopAccountsAsync = database => {
    database.forEach(async database => {
        try {
            const cooked = await bucketTwitters(database);
            counter++
            databases_result['found'].push(database)
            if (counter===5){
                console.log(databases_result);
                
            }  
        } catch (error) {
            counter++
            databases_result['missing'].push(database)
            if (counter===5){
                console.log(databases_result);
                
            }  
        }

        
    });
};
loopAccountsAsync(database)