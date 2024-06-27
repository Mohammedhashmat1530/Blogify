const User = require('../Models/user');

const details = async (id) => {
    try {
        const data = await User.find({_id:id});
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    details
};
