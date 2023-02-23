import ICookieConfig from "./ICookieConfig";
import ICORSConfig from "./ICORSConfig";
import IFastifyConfig from "./IFastifyConfig";
import IJwtConfig from "./IJwtConfig";
import ISessionConfig from "./ISessionConfig";

/**
 * Общая конфигурация фреймворка QReactor
 */
export default interface IQReactorConfig {
    /** Настройки сервера Fastify */
    server?: IFastifyConfig;

    /** Настройка плагинов */
    plugins?: {

        /** Конфиг JWT плагина */
        jwt?: IJwtConfig;
        
        /** Конфиг Cookie плагина */
        cookie?: ICookieConfig;

        /** Конфиг CORS плагина */
        cors?: ICORSConfig;

        /** Конфиг плагина сессий */
        session?: ISessionConfig;
    }
}
