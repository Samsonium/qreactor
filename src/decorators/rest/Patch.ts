import IRoute from "../IRoute";

/** Декоратор метода PATCH */
export default function Patch(path: string): MethodDecorator {
    return (target: Function, pk: string | symbol): void => {
        if (!Reflect.hasMetadata('routes', target.constructor))
            Reflect.defineMetadata('routes', [], target.constructor);

        const routes = Reflect.getMetadata('routes', target.constructor) as IRoute[];
        routes.push({
            method: 'patch',
            path,
            name: pk as string,
            mws: []
        });

        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}
