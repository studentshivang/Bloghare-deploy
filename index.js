require('dotenv').config()
const express = require("express")
const databaseconnection = require('./connectors/dbconnection')
const app = express()
const cors = require("cors")
const fileUpload = require("express-fileupload")
//Connecting Database




app.use(express.json());
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

//Routes
app.use('/api',require('./routes/blogRouter'));
//For image
app.use('/api',require('./routes/upload'));

const port = process.env.PORT || 5000;
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("Client/build"));
      app.get("*", (req, res) => {
        res.sendFile(
          path.resolve(__dirname + "/Client/build/index.html"),
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    }

// const PORT = 5000;
try {
    databaseconnection().then(()=>{
        app.listen(port,()=>{
            console.log('Server  is running on port',port);
        })
    })
} catch (error) {
    console.log(error);
}