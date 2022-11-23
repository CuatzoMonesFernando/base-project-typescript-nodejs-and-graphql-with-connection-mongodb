import mongoose, { mongo } from 'mongoose'
import config from 'config'

export async function connectedDatabase () {
    try {
        const db = config.get('connectionDatabase')
        if (db === 'MONGO_CONNECT_DEV') {
            await mongoose.connect(config.get('dbUri'))
            console.log('connect Mongo DB')
        } else {
            console.log('connection SQL')
        }
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}