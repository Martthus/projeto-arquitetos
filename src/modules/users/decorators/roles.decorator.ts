import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'isPublic';
export const Public = () => SetMetadata(ROLES_KEY, true);

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
