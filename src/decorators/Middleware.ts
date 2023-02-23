import IRoute from "./IRoute";

/** Декоратор промежуточного обработчика */
export default function Middleware(mw: IRoute['mws'][number]): MethodDecorator {
    return (target: Function, pk: string | symbol): void => {
        if (!Reflect.hasMetadata('routes', target.constructor))
            Reflect.defineMetadata('routes', [], target.constructor);

        const routes = Reflect.getMetadata('routes', target.constructor) as IRoute[];
        const i = routes.findIndex(r => r.name === pk as string);
        if (i !== -1) routes[i].mws.push(mw);
        Reflect.defineMetadata('routes', routes, target.constructor);
    }
}
