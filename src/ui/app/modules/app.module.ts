import {Module} from '@nestjs/common';
import {AuthModule} from '@ui/auth/modules/auth.module';
import {WorkOrdersModule} from '@ui/workOrders/modules/workOrders.module';

@Module({
    imports: [
        AuthModule,
        WorkOrdersModule
    ]
})
export class AppModule {
}
