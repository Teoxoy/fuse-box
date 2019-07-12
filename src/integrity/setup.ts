import { Context } from '../core/Context';
import { assembleFastAnalysis } from './assembleFastAnalysis';

export function attachEssentials(ctx: Context) {
  assembleFastAnalysis(ctx);
  //assembleNodeModule(ctx);
}
