import IRoute from "../IRoute";

/** Декоратор метода POST */
export default function Post(path: string): MethodDecorator {
    return (target: Function, pk: string | symbol): void => {
        if (!Reflect.hasMetadata('routes', target.constructor))
            Reflect.defineMetadata('routes', [], target.constructor);

        const routes = Reflect.getMetadata('routes', target.constructor) as IRoute[];
        routes.push({
            method: 'post',
            path,
            name: pk as string,
            mws: []
        });

        Reflect.defineMetadata('routes', routes, target.constructor);
    };
}
