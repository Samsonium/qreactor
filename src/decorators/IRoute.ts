import { IncomingMessage } from "http";
import type { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from "fastify";

/** URL путь */
export default interface IRoute {
    /** Прослушиваемый путь */
    path: string;

    /** Название метода пути */
    name: string;

    /** HTTP метод */
    method: 'get' | 'post' | 'patch' | 'put' | 'delete';

    /** Middlewares */
    mws: ((request: FastifyRequest, response: FastifyReply, next: DoneFuncWithErrOrRes) => any)[];
}
