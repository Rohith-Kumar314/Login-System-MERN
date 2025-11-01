const mongoose = require('mongoose');

const URL = process.env.MONGO_URL;


main()
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(URL);
}