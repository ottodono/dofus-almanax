import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AlmanaxService } from './services/almanax.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AlmanaxService],
})
export class AppModule {}
