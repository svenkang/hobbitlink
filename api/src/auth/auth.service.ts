import { Injectable } from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
  ) {}

  /**
   * Validate the given user credentials against database
   *
   * @param username
   * @param password
   * @returns
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User> | boolean> {
    const user = await this.userService.find(username);
    if (!user) {
      return false;
    }

    const isValid = this.cryptoService.compareHmac(
      password,
      user.password,
      user.passwordKey,
    );
    if (!isValid) {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: realPassword, passwordKey, ...rest } = user;
    return rest;
  }
}
