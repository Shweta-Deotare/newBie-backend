const { userAccount } = require('../gateway/databaseGateway.js');
const authUtil = require('../utils/authUtil');

module.exports = {
    register: async (req, res) => {
        try {
            await userAccount.create({
                f_name: 'Bhagvat',
                l_name: 'lande',
                username: 'bhagvat',
                email: 'landebm@gmail.com',
                mobile: '8149674299',
                password: 'daddsasdas'
            })
            const rs = await userAccount.findAll();

            // generate token
            token = authUtil.generateToken('soem data')
            res.send({users : rs , token : token });
        } catch (err) {
            throw err;
        }
    }
}