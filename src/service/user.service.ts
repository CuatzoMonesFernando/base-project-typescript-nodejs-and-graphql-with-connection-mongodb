import { ApolloError } from "apollo-server-core";
import { CreateUserInput, LoginInput, UserModel } from "../schema/user.schema";
import Context from "../types/context";
import bcrypt from 'bcrypt'
import { signJwt } from "../utils/jwt"
import config from 'config'

class UserService {
    async createUser(input: CreateUserInput) {
        return UserModel.create(input)
    }

    async login (input: LoginInput, context: Context) {
        const _error = 'Invalid Email or Password'

        // get user by email
        const user = await UserModel.find().findByEmail(input.email).lean()
        if(!user) throw new ApolloError(_error)

        // validate password
        const passwordIsValid = await bcrypt.compare(input.password, user.password)
        if(!passwordIsValid) throw new ApolloError(_error)

        // sign a jwt
        const token = signJwt(user)

        // set a cookie for the jwt
        context.res.cookie('access_token', token, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
            domain: config.get('host'),
            path: '/',
            secure: config.get('environment')
        })

        // return jwt
        return token
        
    }
}

export default UserService