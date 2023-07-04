export type TypeOptions = 'info' | 'success' | 'warning' | 'error';

export type Id = number | string

export interface ClearWaitingQueueParams {
    containerId?: Id;
}

export interface ToastContentProps<Data = {}> {
    closeToast?: () => void;
    toastProps: IToastProps;
    data?: Data;
}

export type ToastContent<T = unknown> =
    | React.ReactNode
    | ((props: ToastContentProps<T>) => React.ReactNode);

export interface IToastProps {
    type?: TypeOptions,
    message: string,
    closeToast: () => void,
    status: string,
    isToastActive?: () => void,
    position: number,
    setStatusToast: (s: string, id: Id) => void
}

export interface ToastContainerProps {
    type?: TypeOptions,
    limit?: number
}

export type ToastItemStatus = 'added' | 'removed' | 'updated';

export interface ToastItem<Data = {}> {
    content: ToastContent<Data>;
    id: Id;
    type?: TypeOptions;
    isLoading?: boolean;
    containerId?: Id;
    data: Data;
    status: ToastItemStatus;
}

/**
 * @INTERNAL
 */
export interface NotValidatedToastProps extends Partial<IToastProps> {
    toastId: Id;
}

/**
 * @INTERNAL
 */
export interface Toast {
    content: ToastContent;
    props: IToastProps;
}