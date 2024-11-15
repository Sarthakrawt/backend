const asyncHandler = (resquestHandler) => {
    (req, res, next)=>{
        Promise.resolve().catch((error)=>next(err))
    }
}


export {asyncHandler}





// const asyncHandler  =(fn) =>async (req , res ,next)=>{
// try{
// await fn(req, res, next)
// }catch(err){
//     res.status(err.code || 500).json({
//         success: false,
//         message:err.message
//     })
// }
// }
