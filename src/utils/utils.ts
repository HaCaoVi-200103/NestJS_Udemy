const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = async (plainPassword: string) => {
    try {
        const hash = await bcrypt.hash(plainPassword, saltRounds)
        return hash
    } catch (error) {
        console.log(error);
        return null
    }
}

export const comparePassword = async (plainPassword: string, hashPassword: string) => {
    try {
        return await bcrypt.compare(plainPassword, hashPassword)
    } catch (error) {
        console.log(">>> check comparePassword: ", error);
    }
}