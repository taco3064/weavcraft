import { SupabaseClient, createClient } from '@supabase/supabase-js';
import configs from '../configs';

const supabaseClient: SupabaseClient<any, 'public', any> = createClient(
  configs.cfgs.supabase.url,
  configs.cfgs.supabase.key
);
export default supabaseClient;
