import {Module} from '@nestjs/common';
import {AuthModule} from '../../auth/modules/auth.module';
import {WorkOrdersModule} from '../../workOrders/modules/workOrders.module';

@Module({
  imports: [
    AuthModule,
    WorkOrdersModule
  ]
})
export class AppModule {}
