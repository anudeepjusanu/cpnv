/* Exception Handling for uncaught Exceptions*/

module.exports = function(response, err){
    console.log('\n Caught exception:'+ err);
    response.status(500).json({error: `${err? err : '500 internal server error'}`});
};