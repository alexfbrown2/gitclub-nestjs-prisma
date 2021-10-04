import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log('handle request!');
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
