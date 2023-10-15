import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { CryptoModule } from 'src/crypto/crypto.module';
import { SessionSerializer } from './session.serializer';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UserModule,
    CryptoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, AuthGuard],
})
export class AuthModule {}
