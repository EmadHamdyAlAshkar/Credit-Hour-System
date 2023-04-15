function functions(Schema){
    Schema.statics.check_query=function check_query(req){
        let obj={
            page:1,
            limit:2,
            sort:"name",
            // sort:-1,
            select:{}
        }
        if("page"in req.body){
            obj.page=req.body.page
        }
        if("limit"in req.body){
            obj.limit=req.body.limit
        }
        if("sort"in req.body){
            let arrayoffields=req.body.sort.split(' ')
            let sortobj={}
            for(let i=0;i<arrayoffields.length;i++){
                if(arrayoffields[i][0]=='-'){
                    arrayoffields[i]=arrayoffields[i].replace('-','')
                    sortobj[arrayoffields[i]]=-1
                }
                else{
                    sortobj[arrayoffields[i]]=1
                }
            }
            
            // console.log('********************************************************')
            // console.log(sortedbyobj)
            // console.log('********************************************************')
            obj.sort=sortobj
        }
        // if("sort"in req.query){
        //     obj.sort=req.query.sort
        // }
        if("select"in req.body){
            let y=req.body.select
            obj.select.y=1
        }
        // add skip
        obj.skip=(obj.page-1)*obj.limit
        return obj
    }
}
export default functions