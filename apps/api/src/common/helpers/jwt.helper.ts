import { Jwt } from '@weavcraft/helpers';
import configs from '../../configs';

const jwtHelper = Jwt.initial(configs.cfgs.jwt.secret, {
  expiresIn: configs.cfgs.jwt.expiresIn,
});

export default jwtHelper;
