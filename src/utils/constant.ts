import { TypeOptions } from "@/@types/toast";

type KeyOfType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

export const TYPE: { [key in KeyOfType]: TypeOptions } = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
};

export const enum Type {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    DEFAULT = 'default'
}