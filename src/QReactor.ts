import { default as fastify, FastifyInstance, FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify";
import IQReactorConfig from "./configs/IQReactorConfig";
import FakeClass from "./FakeClass";
import IRoute from "./decorators/IRoute";

// Plugins
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import fastifyCompress from "@fastify/compress";

/**
 * Базовый класс QReactor
 */
export default class QReactor {
    private f: FastifyInstance;

    private constructor(f: FastifyInstance) {
        this.f = f;
    }

    /**
     * Инциализирует и настраивает сервер
     * @returns Инстанс QReactor
     */
    public static Setup(config: IQReactorConfig): QReactor {
        const _f = fastify(config?.server);
        QReactor.RegisterPlugins(_f, config);

        return new this(_f);
    }

    /**
     * Подключение плагинов
     * @param f Инстанс Fastify
     */
    private static RegisterPlugins(f: FastifyInstance, c?: IQReactorConfig): void {
        // Check for JWT plugin config
        if (c?.plugins?.jwt)
            f.register(fastifyJwt, c?.plugins?.jwt);

        // Check cookie secret
        const cookieSecret = c?.plugins?.cookie?.secret;
        if (!cookieSecret) {
            console.log('Ошибка: не указано секретное слово для cookie');
            process.exit(1);
        } else f.register(fastifyCookie, {
            secret: c?.plugins?.cookie?.secret,
            parseOptions: c?.plugins?.cookie?.parser
        });

        // Setup CORS
        f.register(fastifyCors, c?.plugins?.cors)

        // Setup Session
        const sessionSecret = c?.plugins?.session?.secret;
        if (!sessionSecret) {
            console.log('Ошибка: не указано секретное слово для сессионного cookie');
            process.exit(1);
        } else f.register(fastifySession, c?.plugins?.session);

        // Setup compress
        f.register(fastifyCompress);
    }
    
    //////////////// МЕТОДЫ ////////////////

    /** Добавить роутер */
    public add(...routers: FakeClass[]): void {
        routers.forEach(r => {
            const _instance = new r();
            const _prefix: string = Reflect.getMetadata('prefix', r);
            const routes: IRoute[] = Reflect.getMetadata('routes', r);
            routes.forEach(route => {
                if (route.mws.length) this.f[route.method](
                    _prefix + (route.path.startsWith('/') || _prefix.substring(-1) ? '' : '/') + route.path,
                    async (request: FastifyRequest, response: FastifyReply) => {
                        await _instance[route.name](request, response);
                    }
                );
                else this.f[route.method](
                    _prefix + (route.path.startsWith('/') || _prefix.substring(-1) ? '' : '/') + route.path,
                    async (request: FastifyRequest, response: FastifyReply) => {
                        await _instance[route.name](request, response);
                    }
                );
            });
        });
    }

    /** Запустить сервер */
    public Launch(port: number): Promise<void> {
        return new Promise<void>(r => this.f.listen({ port }, () => r()));
    }

    /** Остановить сервер */
    public async Stop(): Promise<void> {
        await this.f.close();
    }

    //////////////// ГЕТТЕРЫ ////////////////

    /**
     * Сервер Fastify
     */
    public get fastify(): FastifyInstance {
        return this.f;
    }
}
