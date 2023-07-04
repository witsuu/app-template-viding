import { Event, eventManager } from "@/@core/eventManager";
import { ClearWaitingQueueParams, IToastProps, Id, Toast, ToastContainerProps, ToastContent } from "@/@types/toast";
import { useEffect, useReducer, useRef, useState } from "react"

interface QueuedToast {
    toastContent: ToastContent;
    toastProps: IToastProps;
    staleId?: Id;
}

export interface ContainerInstance {
    toastKey: number;
    displayedToast: number;
    props: ToastContainerProps;
    containerId?: Id | null;
    isToastActive: (toastId: Id) => boolean;
    getToast: (id: Id) => Toast | null | undefined;
    queue: QueuedToast[];
    count: number;
}

export const useToastContainer = (props: any) => {
    const [toastIds, setToastIds] = useState<Id[]>([]);
    let status = "OPEN" || "LOADING" || "CLOSED"
    const toastToRender = useRef(new Map()).current
    const containerRef = useRef(null)
    const isToastActive = (id: Id) => toastIds.indexOf(id) !== toastIds.length - 1
    const [, forceUpdate] = useReducer(x => x + 1, 0)

    const instance = useRef<ContainerInstance>({
        toastKey: 1,
        displayedToast: 0,
        count: 0,
        queue: [],
        props,
        isToastActive,
        containerId: null,
        getToast: id => toastToRender.get(id),
    }).current;

    useEffect(() => {
        instance.containerId = props?.containerId
        eventManager.cancelEmit(Event.WillUnmount)
            .on(Event.Show, appendToast)
            .on(Event.Clear, clearEvent)
            .emit(Event.DidMount, instance)


        return () => {
            toastToRender.clear()
            eventManager.emit(Event.WillUnmount, instance);
        }
    }, [])

    function clearEvent(toastId?: Id) {
        containerRef.current && removeToast(toastId)
    }

    function removeToast(toastId?: Id) {
        toastToRender.delete(toastId)

        setToastIds(state =>
            toastId == null ? [] : state.filter(id => id !== toastId)
        );
    }

    function appendToast(message: string, props: any, cb: () => void) {
        const { id, type } = props
        const closeToast = () => {
            removeToast(id)
        }
        const setStatusToast = (s: string, id: Id) => {
            const temp = toastToRender.get(id)
            temp.status = s
        }
        const toast = {
            message, type, position: id, closeToast, status, setStatusToast
        }
        toastToRender.clear()

        const timeOut = setTimeout(() => {
            closeToast()
        }, 5000)

        toastToRender.set(id, toast)

        setToastIds(prev => [...prev, id])
    }

    function getToastToRender<T>(cb: (toastList: any[]) => T) {
        const toRender = new Map()
        const collection = Array.from(toastToRender.values())

        collection.forEach(toast => {
            const { position } = toast;
            toRender.has(position) || toRender.set(position, []);
            toRender.get(position)!.push(toast);
        });

        return Array.from(toRender, (x) => cb(x[1]));
    }

    return {
        getToastToRender, containerRef, isToastActive
    }
}