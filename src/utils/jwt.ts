import Jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const publicKey =  Buffer.from(process.env.PUBLIC_KEY as string, 'base64').toString('ascii')
const privateKey =  Buffer.from(process.env.PRIVATE_KEY as string, 'base64').toString('ascii')

export function signJwt(object: Object, options?: Jwt.SignOptions | undefined ) {
    return Jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS512'
    })
}

export function verifyJwt<T>(token: string):T | null {
    try {
        return Jwt.verify(token, publicKey) as T
    } catch (error) {
        return null
    }
}