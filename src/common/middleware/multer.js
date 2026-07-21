import multer from "multer"

export const upload =(file)=>{
   try {
     const storage =multer.diskStorage({
         destination:function (req,file,cb){
             cb(null,'uploads')
 
         },
         filename:function(req,file,cb){
             const uniqueSuffix=Date.now() + '-' + Math.round(Math.random() * 1E9)
           cb(null,file.fieldname +'-' +uniqueSuffix + file.originalname)
         }
 
     })
     const uploads =multer({storage})
     return uploads
   } catch (error) {
    console.log(error);
    
   }

}