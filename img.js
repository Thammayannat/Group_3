const multer = require('multer')
console.log('เข้ามาแล้วจ้า');
// const upload = multer({ dest: "uploads/" });

const Filefilter = (req,file,cb)=>{
    
    if (file.originalname.endsWith('.png')||file.originalname.endsWith('.mp4')||file.originalname.endsWith('.jpg')){
        cb(null,true)
    }else{
        cb("กรุณาอัพโหลดไฟล์", false)
    }
}

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname+'/storage/')
    },filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }

})
let uploadfile = multer({storage:storage,fileFilter:Filefilter})

module.exports = uploadfile