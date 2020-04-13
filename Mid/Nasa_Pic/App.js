
const inquirer = require('inquirer');
const Custom_API = require('Custom_Nasa')

const _print = result => {
    result.forEach((item,i )=> {
        console.log(`${i}    ${item.title}`);
    });    
};

const _another = () => {
return inquirer.prompt([
    {
        type: 'list',
        name: 'answer',
        message: 'What Kind of NASA Images do  you want to see?',
        choices: ["star","mars","nebula"]
    }
]);
}


const _discardPrompt = async items => {
    const display = items.map(item => {
        return { name: `${item.title}`};
    });
    return inquirer.prompt([
        {
            type: 'list',
            name: 'line',
            message: '',
            choices:display      
        }
    ]);
};

    
async function show() {

     const BrowsResponse = await Custom_API.fetch_pic();
     _print(BrowsResponse);
    
     
}

async function search(User_searck_key="nebula") {
 
    const user_search_result=await Custom_API.search_pic (User_searck_key)
    // print it
     _print(user_search_result);


     // first prompt  asking about star or mars or nebula
     const UaerFisrt_choice = await _another();

     // fetch it
     const search_pic=await Custom_API.search_pic(UaerFisrt_choice['answer'])
     // print it
     _print(search_pic);
     // second Prompt 
     const userSecondtSelec =await _discardPrompt(search_pic)
     search_pic.forEach((item)=> {
        if (item.title == userSecondtSelec["line"]){
            itemDetail=item.description.split(".")
            console.log(" description:"+ itemDetail[0])
            console.log("media_type:"+item.media_type)
        }
     });   

   
}




   module.exports = {
   show,search
};
