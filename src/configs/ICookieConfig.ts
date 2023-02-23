export default class ICookieConfig {
    /** Секретное слово */
    secret: string;
    
    /** Настройки парсера */
    parser?: {
        
        /** Домен, указываемый при записи cookie */
        domain?: string;

        /** Срок жизни */
        expires?: Date;

        /** HttpOnly аттрибут */
        httpOnly?: boolean;

        /** Path атрибут */
        path?: string;

        /** 
         * SameSite аттрибут. Варианты:
         * - true: строгое исполнение на одном сайте
         * - false: отключение SameSite
         * - 'lax': нестрогое исполнение на сайте
         * - 'none': явный межсайтовый cookie
         * - 'strict': то же самое, что и в значении true
         */
        sameSite?: boolean | 'lax' | 'none' | 'strict';

        /** Аттрибут Secure */
        secure?: boolean | 'auto';

        /** Подпись cookie */
        signed?: boolean;
    }
}
