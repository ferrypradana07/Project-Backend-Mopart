const {countrys} = require('../model/countryModel')

const getCountrysList = (req, res) => {
    try {
        const countryList = countrys.findAll({
            order : [['name', 'ASC']]
        })
        if (countryList.lenght > 0) {
            return res.status(200).json(countryList)
        }
        res.status(200).json({message : 'country not found'})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}

const getCountryNameById = async (req, res, next) => {
    try {
        const countryId = req.userdata.country

        if (!countryId) {
            req.userdata.country = 'indonesia'
            return next()
        }
        const country_name = await countrys.findOne({
            where : {
                id : countryId
            },
            attributes : ['name']
        })
        req.userdata.country = country_name.name
        return next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})   
    }
}

module.exports = {getCountrysList, getCountryNameById}