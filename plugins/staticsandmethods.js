import Apierror from "../helpers/APIerrorhandler";


async function validateExist (filter = {}, err = ''){
    const check = await this.exists(filter)
    console.log(check)
    if (check){
      throw new Apierror(422, err);
    } else{
      return true
    }}


async function checkExist (filter = {}, err = '') {
        const check = await this.exists(filter)
        console.log(check)
        if (check){
          return true
        } else{
            throw new Apierror(404, err);
        }}

  async function checkExistThenGet (filter = {}, select = {}, err = '', populate =''){
    const check = await this.findOne(filter, select ).populate(populate)
    console.log(check)
    if (check){
      return  check
    } else{
        throw new Apierror(404, err);
    }}

//  function showalllanguage(){
//       const check = this.toJSON({virtuals:false})
      
//         return  check}
//   function localizeall (recs = []){
//    recs.forEach((rec, i, recs)=>{
//     recs[i] = rec.showalllanguage()
//    })
//    return recs
//   }

export {validateExist, checkExist, checkExistThenGet}
