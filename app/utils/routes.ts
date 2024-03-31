import {ROUTES} from '~/constants/routes';

export const getRouteFromPath = (path: string) => {
  return Object.values(ROUTES).find((route) => path.includes(route.path));
};
