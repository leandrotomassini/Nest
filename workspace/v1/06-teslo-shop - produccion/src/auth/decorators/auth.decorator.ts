
import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { validRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';

export function Auth(...roles: validRoles[]) {

    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(
            AuthGuard(),
            UserRoleGuard
        )
    );
}