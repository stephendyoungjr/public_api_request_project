

async function getUsers(){
    try{
        const response = await fetch("https://randomuser.me/api/?results=12&inc=picture,name,email,location");

        if(!response.ok) throw new Error(`something went wrong: ${response.status}`);

        const data = await response.json();


    } catch(error) {
        console.error(error);

    }


}


function displayUsers(data){
    data.forEach((user)=> {
        const userHtml = 

        `
        
        
        
        
        
        
        
        
        `


    })



}