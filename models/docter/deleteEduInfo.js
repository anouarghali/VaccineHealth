var mongoose = require("mongoose")
var schema = require("./schema")
var Docter = mongoose.model("Docter",schema)

deleteSomeInfo = (req,res) => {
    Docter.findById(req.user._id, (err, foundDocter) => {
        if(err){
            console.log(err)
            req.flash("error","UNEXPECTED ERROR OCCURED!!!")
            res.redirect("indexDocter")
        }else{
            var list = foundDocter.education
            var newList = list.slice(0,req.params.index)
            newList = newList.concat(list.slice(( req.params.index) + 1,list.length))
            foundDocter.education = newList
            foundDocter.save( (err,savedDocter) => {
                if(err){
                    console.log(err)
                    req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                    res.redirect("indexDocter")
                }else{
                    Docter.findByIdAndUpdate(req.user._id, savedDocter ,(err,updatedDocter) => {
                        if(err){
                            console.log(err)
                            req.flash("error","UNEXPECTED ERROR OCCURED!!!")
                            res.redirect("indexDocter")
                        }else{
                            req.flash("success","Données mises à jour avec succès!!!")
                            res.redirect("profileDocter")
                        }
                    } )
                }
            } )
        }
    } )
}

module.exports = deleteSomeInfo