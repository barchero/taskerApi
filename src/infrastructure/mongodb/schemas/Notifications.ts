import {MongooseModule, Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Notifications extends Document{
    @Prop({
        default: '',
        unique: false
    })
    url: string;

    @Prop({
        default: '',
        unique: false
    })
    title: string;

    @Prop({
        default: '',
        unique: false
    })
    message: string;

    @Prop({
        default: false,
        unique: false
    })
    read: boolean;

    @Prop({
        default: Date.now(),
        unique: false
    })
    created: Date;


}

const NotificationsSchema = SchemaFactory.createForClass(Notifications);

export const notificationsSchemaModule = MongooseModule.forFeature([{
    name: 'Notifications',
    schema: NotificationsSchema
}])

