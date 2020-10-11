import {LoginRepository} from '@domain/auth/repositories/LoginRepository';
import * as mongoose from 'mongoose';
import {Model} from 'mongoose';
import {UserModel} from '../../schemas/UserModel';
import {User} from '@domain/auth/entities/User';

export class LoginRepositoryImpl extends LoginRepository {

    constructor(private userModel: Model<UserModel>) {
        super();
    }

    async findUserByLogInUser(loginData): Promise<User> {
        const {username, password} = loginData;
        return new Promise<User>((success, error) => {
            this.userModel.findOne({username, password}, (err, res) => {
                if (err) {
                    error(err);
                } else {
                    success(Object.assign(new User(), res.toObject()));
                }
            });
        });
    }

    async findUserById(id: string): Promise<User> {
        return new Promise<User>((success, error) => {
            this.userModel.findOne({_id: new mongoose.Types.ObjectId(id)}, (err, res) => {
                if (err) {
                    error(err);
                } else {
                    success(Object.assign(new User(), res.toObject()));
                }
            });
        });
    }

}
