const workshalaCtrl = {
    dashBoard : async (req, res) => {
        try {
            res.status(201).json(req.payload)
        }catch(err){
            res.send(err); 
        }
    }
};

module.exports = {workshalaCtrl};