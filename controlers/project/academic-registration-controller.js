import academicregistration from "../../models/academic-registration/academic-registration-model"



let isRegisterationEnabledaaaa 

async function registerationactivation(req,res){
    const academicregistrationnn = await academicregistration.findOne({_id:1})
    const decision = req.body.decision
    if(decision == "activate"){
        if(academicregistrationnn.status == true){
            return res.json({status:"true",message:"Academic registration is already activated"}) 
        }
        academicregistrationnn.status = true
        await academicregistrationnn.save()
        return res.json({status:"true",message:"Academic registration activated successfully"})
    }
    else if(decision == "deactivate"){
        if(academicregistrationnn.status == false){
            return res.json({status:"false",message:"Academic registration is already deactivated"}) 
        }
        academicregistrationnn.status = false
        await academicregistrationnn.save()
        return res.json({status:"false",message:"Academic registration deactivated successfully"})
    }
    else{
        return res.json({message:"Please enter (activate) or (deactivate)"})

    }
    

}

async function showacademicregistrationstatus(req,res){
    const academicregistrationnn = await academicregistration.findOne({_id:1})
    if(academicregistrationnn.status == true){
        return res.json({status:"true"})
    }else{
        return res.json({status:"false"})
    }
}

// async function createacademicregistration(req,res){
// const academicregistrationnn = new academicregistration({
//     _id : 1,
//     status:true
// })
// await academicregistrationnn.save()
// res.send("Ok")

// }




export default{
    registerationactivation,
    showacademicregistrationstatus,

}