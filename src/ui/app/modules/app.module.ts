import {Module} from '@nestjs/common';
import {AppController} from '../controllers/app.controller';
import {AppService} from '../services/app.service';
import {mongooseModule} from '../../../infrastructure/mongodb/mongooseModule';
import {AuthModule} from '../../auth/modules/auth.module';

@Module({
  imports: [
    mongooseModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
