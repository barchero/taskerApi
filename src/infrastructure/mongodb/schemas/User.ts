import {MongooseModule, Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

@Schema()
export class User extends Document{
    @Prop({
        default: 0
    })
    codigo: number;

    @Prop({
        default: '',
        trim: true
    })
    firstName: string;

    @Prop({
        default: '',
        trim: true
    })
    lastName: string;

    @Prop({
        trim: true
    })
    displayName: string;

    @Prop({
        default: '',
        trim: true
    })
    email: string;

    @Prop({
        unique: 'testing error message',
        required: 'Please fill in a username',
        trim: true
    })
    username: string;

    @Prop({
        default: ''
    })
    password: string;

    @Prop({
        default: ''
    })
    onlinePass: string;

    @Prop()
    salt: string;

    @Prop({
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user']
    })
    roles: string[];

    @Prop()
    updated: Date;

    @Prop({
        default: Date.now
    })
    created: Date;

    @Prop()
    resetPasswordToken: string;

    @Prop()
    resetPasswordExpires: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Notifications'})
    notifications: any;

}

const UserSchema = SchemaFactory.createForClass(User);

export const userSchemaModule = MongooseModule.forFeatureAsync([{
    name: 'User',
    useFactory: () => {
        const schema = UserSchema
        schema.pre('save', (next) =>{
            if (this.password && this.password.length > 6) {
                this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
                this.password = this.hashPassword(this.password);
            }

            next();
        })
        schema.methods = {
            hashPassword: (password) => {
                if (this.salt && password) {
                    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
                } else {
                    return password;
                }
            },
            authenticate: (password) => this.password === this.hashPassword(password)
        }
        schema.statics = {
            findUniqueUsername: (username, suffix, callback) => {
                const possibleUsername = username + (suffix || '');

                this.findOne({
                    username: possibleUsername
                }, (err, user) => {
                    if (!err) {
                        if (!user) {
                            callback(possibleUsername);
                        } else {
                            return this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                        }
                    } else {
                        callback(null);
                    }
                });
            }
        };
        return schema;
    }
}])

