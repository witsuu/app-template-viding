import { Id, ToastContent } from "@/@types/toast";
import { ContainerInstance } from "@/hooks/useToastContainer";
import { Event, eventManager } from "./eventManager";
import { Type } from "@/utils";

interface EnqueuedToast {
    messsage: string,
    type: string,
    toastId: Id
}

let containers = new Map<ContainerInstance | Id, ContainerInstance>();
let latestInstance: ContainerInstance | Id;
let queue: EnqueuedToast[] = [];
let TOAST_ID = 1;

export const dispatch = new Map()

function generateToastId() {
    return `${TOAST_ID++}`
}

function dispatchToast(message: string, type: string, id: Id) {
    eventManager.emit(Event.Show, message, { id, type })
}

function createToastByType(type: string) {
    return (
        message: string,
    ) => dispatchToast(message, type, generateToastId());
}

function toast<TData = unknown>(
    message: string
) {
    return dispatchToast(message, "info", generateToastId());
}

toast.success = createToastByType(Type.SUCCESS);
toast.info = createToastByType(Type.INFO);
toast.error = createToastByType(Type.ERROR);
toast.warning = createToastByType(Type.WARNING);

toast.dismiss = (id?: Id) => {
    if (containers.size > 0) {
        eventManager.emit(Event.Clear, id);
    }
};

/**
 * Clear waiting queue when limit is used
 */
// toast.clearWaitingQueue = (params: ClearWaitingQueueParams = {}) =>
//     eventManager.emit(Event.ClearWaitingQueue, params);


toast.isActive = (id: Id) => {
    let isToastActive = false;

    // containers.forEach(container => {
    //     if (container.isToastActive && container.isToastActive(id)) {
    //         isToastActive = true;
    //     }
    // });

    console.log("isActive")

    return isToastActive;
};

eventManager
    .on(Event.DidMount, (containerInstance: ContainerInstance) => {
        latestInstance = containerInstance.containerId || containerInstance;
        containers.set(latestInstance, containerInstance);

        queue.forEach((item) => {
            eventManager.emit(Event.Show, item.messsage, { type: item.type, id: item.toastId });
        });

        queue = [];
    })
    .on(Event.WillUnmount, (containerInstance: ContainerInstance) => {
        containers.delete(containerInstance.containerId || containerInstance);

        if (containers.size === 0) {
            eventManager
                .off(Event.Show)
                .off(Event.Clear)
                .off(Event.ClearWaitingQueue);
        }
    });

export { toast }