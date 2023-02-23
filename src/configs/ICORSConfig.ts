export default interface ICORSConfig {
    /** Разрешённые HTTP заголовки */
    allowedHeaders?: string | string[];
    
    /** Настройка заголовка Access-Control-Expose-Headers */
    exposedHeaders?: string | string[];

    /** Разрешённые типы запросов (заголовок Access-Control-Allow-Methods) */
    methods?: string | string[];

    /** Настройка заголовка Access-Control-Allow-Credentials */
    credentials?: boolean;

    /** Настройка заголовка Access-Control-Allow-Origin */
    origin?: string;

    /** Включает CORS Preflight */
    preflight?: boolean;
}
