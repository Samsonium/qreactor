import QReactor from "./QReactor";
import 'reflect-metadata';

// Config
import ICookieConfig from "./configs/ICookieConfig";
import ICORSConfig from "./configs/ICORSConfig";
import IFastifyConfig from "./configs/IFastifyConfig";
import IJwtConfig from "./configs/IJwtConfig";
import ISessionConfig from "./configs/ISessionConfig";
import IQReactorConfig from "./configs/IQReactorConfig";

// Decorators
import Router from "./decorators/Router";
import Get from "./decorators/rest/Get";
import Post from "./decorators/rest/Post";
import Patch from "./decorators/rest/Patch";
import Put from "./decorators/rest/Put";
import Delete from "./decorators/rest/Delete";

export {
    QReactor as default,

    // Config
    ICookieConfig,
    ICORSConfig,
    IFastifyConfig,
    IJwtConfig,
    ISessionConfig,
    IQReactorConfig,

    // Decorators
    Router,
    Get,
    Post,
    Patch,
    Put,
    Delete,
}
