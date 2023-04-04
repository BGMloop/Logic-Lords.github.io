const express = require('express');
const mongoose = require('mongooes');

const app = express();

const uri = 'mongodb+srv://LogicLords:LogicLords123@cluster0.cri5x.mongodb.net/documents?retryWrites=true&w=majority'

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("connected to MongoDB");
    }   catch (error)   {
        console.error(error);
    }
}

connect();

app.listen(3000, () => {
    console.log("Server started on port 3000")

})