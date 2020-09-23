import {MongooseModule} from '@nestjs/mongoose';
import {Config} from '../../Config';

export const mongooseModule = MongooseModule.forRoot(`mongodb://${Config.MONGODB_URL}:${Config.MONGODB_PORT}/${Config.MONGODB_DATABASE}`);
