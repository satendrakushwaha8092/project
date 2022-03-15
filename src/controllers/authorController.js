const AuthorModel= require("../models/AuthorModel")

const createAuthor= async function (req, res) {
    try{
    let data= req.body
    let savedData= await AuthorModel.create(data)
    res.status(200).send({msg: savedData})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

const getauthorData= async function (req, res) {
    let allUsers= await AuthorModel.find()
    res.status(200).send({msg: allUsers})
}
module.exports.createAuthor= createAuthor
module.exports.getauthorData= getauthorData