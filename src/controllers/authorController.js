const AuthorModel = require("../models/AuthorModel")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const createAuthor = async function (req, res) {
    try {
        let data = req.body

        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "requst body is empty"
        })

        if (!isValid(data.fname)) return res.status(400).send({
            status: false,
            msg: "first name is required"
        })

        if (!isValid(data.lname)) return res.status(400).send({
            status: false,
            msg: "last name is required"
        })

        if (!isValid(data.title)) return res.status(400).send({
            status: false,
            msg: "title is required"
        })

        if(!(["Mr", "Mrs", "Miss"].indexOf(data.title) !== -1)){
            return res.status(400).send({ status: false, message: "title should be Mr,Mrs,Miss" })
        }

        if (!isValid(data.email)) return res.status(400).send({
            status: false,
            msg: "email is required"
        })

        if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email)) {
            return res.status(400).send({
                status: false,
                msg: "valid email is required"
            })
        }

        if (await AuthorModel.findOne({ email: data.email })) return res.status(400).send({
            status: false,
            msg: "email is already used"
        })

        if (!isValid(data.password)) return res.status(400).send({
            status: false,
            msg: "password is required"
        })

        let savedData = await AuthorModel.create(data)
        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createAuthor = createAuthor
