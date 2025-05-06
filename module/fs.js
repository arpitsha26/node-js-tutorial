
const { error } = require('console')
const fs= require('fs')

//fs.writeFileSync('./ab.txt', "hey there");
// sync file write


//fs.writeFile('./b.txt', "hello", (err) =>{})
// Async file write(call back function required )


//const b= fs.readFileSync('./ab.txt', 'utf-8')
//console.log(b)
//read file sync 

/*fs.readFile('./b.txt', 'utf-8', (err,result)=>{
    if(err){console.log("error",err);}
    else {
        console.log(result);
    }
})*/
// read file async (no return )(call back required)




