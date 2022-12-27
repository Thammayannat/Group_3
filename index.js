const express = require("express");
const app = express();
const multer = require("multer");
const upload = require("./img")
const fs = require('fs')
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('eiei'))
app.use(cors());

const mysql = require("mysql2/promise");
const { error } = require("console");
let dbConn = mysql.createConnection({
    host: '34.87.51.133',
    user: 'gosoft_rookie',
    password: 'GosoftRookie',
    database: 'store-platform',
    port: 3306
});

app.use('/promotion/edit', upload.single('file'))

// app.get('/', (req, res) => {
//     res.sendFile('index.html')
// })

app.get("/name", async (req, res) => {
        const connection = await dbConn;
        const rows = await connection.query(`SELECT * from ads`);
        res.send(rows[0]);
});

app.put("/promotion/edit", async (req, res) => {
    const conection = await dbConn
    console.log(req.body);
    
    console.log(req.file);

    let adsId = req.body.adsId;
    let adsName = req.body.adsName;
    let enable = req.body.enable;
    
    if (!adsId.length) {
        return res
            .status(400)
            .send({
                isSuccess: false,
                message: "did't have id"
            })
    }
    
    if (!adsName.length) {
        return res
            .status(400)
            .send({
                isSuccess: false,
                message: "did't have name"
            })
    }

    if (enable == -1) {
        return res
            .status(400)
            .send({
                isSuccess: false,
                message: "did't have Bit"
            })
    }
    if (!req.file) return res.send('none')
    let adsFliename = req.file.originalname;
    // let adsFliename = req.body.adsFliename;

    await conection.query(`UPDATE ads SET adsName = '${adsName}',adsFliename = '${adsFliename}',enable = b'${enable}' WHERE adsId = '${adsId}'`)
    res.status(200).send({
        isSuccess: true,
        message: "แก้ไขข้อมูลสำเร็จ"
    });
})

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})





// const updateAds = async () => {
//   // Get the values from the form inputs
//   const adsName = document.querySelector("input[name='name']").value;
//   const enable = document.querySelector("input[name='enable']").checked;

//   // Send a PUT request to the server
//   const response = await fetch('/promotion/edit', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       adsName,
//       enable,
//     }),
//   });

//   // Check the response status
//   if (response.ok) {
//     console.log('Successfully updated the ads');
//   } else {
//     console.log('Failed to update the ads');
//   }
// };

// // Call the function when the form is submitted
// document.querySelector('form').addEventListener('submit', (event) => {
//   event.preventDefault();
//   updateAds();
// });

// const multer = require('multer');

// // Set up Multer to handle file uploads
// const upload = multer({ dest: 'uploads/' });

// // Add a route that accepts file uploads
// app.post('/upload', upload.single('fileInput'), (req, res) => {
//   // req.file contains information about the uploaded file
//   // You can use this information to save the file to a database, for example

//   // Send a response to the client to confirm that the file was uploaded successfully
//   res.send({ result: 'File uploaded successfully' });
// });

// app.put('/update', (request, response) => {
//     const { name, value } = request.body
//     const sql = `UPDATE <table> SET ${name} = ? WHERE id = ?`
//     const data = [value, id]
//     db.query(sql, data, (error, result) => {
//       if (error) throw error
//       response.redirect('/')
//     })
//   })
  
{/* <form action="/update" method="PUT">
  <label>Column Name:</label>
  <input type="text" name="name">
  <label>New Value:</label>
  <input type="text" name="value">
  <button type="submit">Update</button>
</form> */}

// const updateAds = async () => {
//     const adsName = document.querySelector("input[name='adsName']").value;
//     const adsFliename = document.querySelector("input[name='adsFliename']").value;
//     const enable = document.querySelector("input[name='enable']").value;
  
//     const response = await fetch('/promotion/edit', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         adsName,
//         enable,
//       }),
//     });
  
//     if (response.ok) {
//       console.log('Successfully updated the ads');
//     } else {
//       console.log('Failed to update the ads');
//     }
//   };