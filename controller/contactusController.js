const {contactus} = require('../model/contactusModel')

const createForm = async (req, res) => {
    try {
        const { name, email, message } = req.body.params
        console.log(req.body.name)
        console.log(req.query.email)
        console.log(req.params.email)
        console.log(req.body.params.email)
        if (!name || !email || !message) {
            return res.status(400).json({status : 'failed',message : 'name or email or message is required'})
        }
        const result = await contactus.create({
            
            name : name,
            email : email,
            message : message
        })
        res.status(201).json({status : 'success', })
    } catch (error) {
        console.log(error)
        res.status(500).json({status : 'error'})
    }   
}

const getForm = async (req, res) => {
    try {
        const {idForm, email} = req.query?? {}
        if (!idForm) {
            return res.status(400).json({message : "idForm is required"})
        } 
        const result = await contactus.findAll({
            where : {
                id : idForm
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({status : 'error'})
    }
}

module.exports = {createForm, getForm}