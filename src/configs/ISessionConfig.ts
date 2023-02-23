import ICookieConfig from "./ICookieConfig";

export default class ISessionConfig {
    /** Секретное слово cookie */
    secret: string;

    /** Настройки сессионного cookie */
    cookie?: ICookieConfig['parser'];

    /** Название сессионного cookie */
    cookieName?: string;

    /** Сохранение новых сессий в хранилище */
    saveUnititalized?: boolean;
}
