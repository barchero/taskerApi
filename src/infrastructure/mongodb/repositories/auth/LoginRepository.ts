import {LoginRepository} from '@domain/auth/repositories/LoginRepository';
import * as mongoose from 'mongoose';
import {Model} from 'mongoose';
import {UserModel} from '../../schemas/UserModel';
import {User} from '@domain/auth/entities/User';

export class LoginRepositoryImpl extends LoginRepository {

    constructor(private userModel: Model<UserModel>) {
        super();
    }

    async findUserByLogInUser(loginData): Promise<User | null> {
        const {username, password} = loginData;
        return new Promise<User>((success, error) => {
            this.userModel.findOne({username, password}, (err, res) => {
                if (err) {
                    error(err);
                } else if(res){
                    success(Object.assign(new User(), res.toObject()));
                } else {
                    success(null);
                }
            });
        });
    }

    async findUserById(id: string): Promise<User | null> {
        return new Promise<User>((success, error) => {
            this.userModel.findOne({_id: new mongoose.Types.ObjectId(id)}, (err, res) => {
                if (err) {
                    error(err);
                } else if(res){
                    success(Object.assign(new User(), res.toObject()));
                } else {
                    success(null);
                }
            });
        });
    }

}
