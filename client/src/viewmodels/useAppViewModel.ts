import type { AppModel } from '../models/AppModel';

export function useAppViewModel(): AppModel {
  return {
    title: 'Creatine Tracker',
  };
}
