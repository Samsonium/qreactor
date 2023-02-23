/**
 * Декоратор для класса, создающий роутер
 */
export default function Router(prefix: string): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata('prefix', prefix, target);
        if (!Reflect.hasMetadata('routes', target))
            Reflect.defineMetadata('routes', [], target);
    };
}
