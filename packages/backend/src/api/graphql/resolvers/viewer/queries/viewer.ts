import { Context } from '../../../Context';
import { ViewerType } from '../../../entities/ViewerType';

export async function viewer(context: Context): Promise<ViewerType> {
  const { user } = context;
  return { id: user.id };
}
