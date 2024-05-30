import { Get, JsonController, QueryParam } from 'routing-controllers';
import jwtHelper from '../common/helpers/jwt.helper';

@JsonController('/jwt')
export class JwtController {
  @Get('/verify')
  async valify(@QueryParam('token') token: string) {
    return jwtHelper.verifyToken(token);
  }

  @Get('/decode')
  async decode(@QueryParam('token') token: string) {
    return jwtHelper.decodeToken(token);
  }
}
