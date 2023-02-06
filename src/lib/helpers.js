const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

helpers.match = async (passwordInput, userPassword) => {
    try {
       return await bcrypt.compare(passwordInput, userPassword);
    } catch (error) {
        console.error(error);
    }
}

helpers.sideBarNameLetters = async (name) => {
    name = name.toUpperCase();
    const space = name.indexOf('');

    return space/*name.slice(0, 1) + name.slice(space, space++)*/
}

module.exports = helpers