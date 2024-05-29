import { Get, JsonController, QueryParam } from 'routing-controllers';
import jwtHelper from '../common/helpers/jwt.helper';

@JsonController('/jwt')
export class JwtController {
  @Get('/verify')
  async valify(@QueryParam('token') token: string) {
    const data = jwtHelper.verifyToken(token);
    return data;
  }

  @Get('/decode')
  async decode(@QueryParam('token') token: string) {
    return jwtHelper.decodeToken(token);
  }
}
