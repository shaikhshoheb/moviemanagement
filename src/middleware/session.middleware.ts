import { Session } from 'express-session';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
const routesToSkipSessionCheck = ['/users/login', '/users/logout']; 

@Injectable()
export class SessionMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (routesToSkipSessionCheck.includes(req.path)) {
            next();
            return;
          }
        const session: Record<string, any> = req.session;
        if (!session || !session.user) {
            throw new UnauthorizedException('Unauthorized');
          }
        next();
      }
}
