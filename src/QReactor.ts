import { default as fastify, FastifyInstance } from "fastify";

// Plugins
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import fastifyCompress from "@fastify/compress";
import IQReactorConfig from "./configs/IQReactorConfig";

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

    //////////////// ГЕТТЕРЫ ////////////////

    /**
     * Сервер Fastify
     */
    public get fastify(): FastifyInstance {
        return this.f;
    }
}
