module.exports =func=>(req,res,next)=>
    Promise.resolve(func(req,res,next))
    .catch(next);


//alternate option for async-awati with try-Catch block