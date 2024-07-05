const {developers} = require('../model/developerModel')

const getDevList = (req, res) => {
    try {
        const devList = developers.findAll({
            order : [['id', 'ASC']]
        }) 
        if (devList) {
            return res.status(200).json({
                status : 'success',
                result : devList
            })
        }
        res.status(404).json({
            status : 'Not Found'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : 'error',
            message : 'internal was error'})
    }
}

module.exports = {getDevList}