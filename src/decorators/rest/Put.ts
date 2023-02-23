import IRoute from "../IRoute";

/** Декоратор метода PUT */
export default function Put(path: string): MethodDecorator {
    return (target: Function, pk: string | symbol): void => {
        if (!Reflect.hasMetadata('routes', target.constructor))
            Reflect.defineMetadata('routes', [], target.constructor);

        const routes = Reflect.getMetadata('routes', target.constructor) as IRoute[];
        routes.push({
            method: 'put',
            path,
            name: pk as string,
            mws: []
        });

        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}
