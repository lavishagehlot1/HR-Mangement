// export const validate=(schema)=> //here we write schema because we want to use this function for different schema validation in different routes
//     (req,res,next)=>{
//         const{error}=schema.validate(req.body);
//         if(error){
//             return res.status(400).json({
//                 status:"fail",
//                 message:error.details[0].message 
//                 /**[ {
//                       message: "email must be a valid email"
//                       }
//                 ]*/
//             })
//         }
//         next()
//     }



//single validation middlewarefor all body,query and params.

export const validate = (schemas) => (req, res, next) => {
  try {
    //  schemas = { body: JoiSchema, query: JoiSchema, params: JoiSchema }

    // 1️ Validate request body
    if (schemas.body) {
      const { error, value } = schemas.body.validate(req.body, { abortEarly: false });
      if (error) throw error; //  throw error to global error handler
      req.body = value; // sanitized data
    }

    // 2 Validate query parameters
    if (schemas.query) {
      const { error, value } = schemas.query.validate(req.query, { abortEarly: false });
      if (error) throw error;
      req.query = value; // sanitized data
    }

    // 3️Validate route params
    if (schemas.params) {
      const { error, value } = schemas.params.validate(req.params, { abortEarly: false });
      if (error) throw error;
      req.params = value; // sanitized data
    }

    next(); // everything passed validation
  } catch (err) {
    next(err); // send error to global error handler
  }
};