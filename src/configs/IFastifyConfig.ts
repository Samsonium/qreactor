
export default interface IFastifyConfig {
    /** Чувствительность к регистру в URL. По умолчанию true */
    caseSensitive?: boolean;

    /** Максимальный вес тела запроса, который может принять сервер (в байтах). По умолчанию 1 Мб */
    bodyLimit?: number;

    /** Переключает работу сервера на HTTP/2. По умолчанию false */
    http2?: boolean;

    /** Таймаут запроса от клиента (в мс). По умолчанию без таймаута (0) */
    requestTimeout?: number;

    /** Игнорирование слеша в конце URL. По умолчанию false */
    ignoreTrailingSlash?: boolean;

    /** Включает возможность использования регулярных выражений в URL. По умолчанию false */
    allowUnsafeRegex?: boolean;
}
