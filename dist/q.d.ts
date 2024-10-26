declare module "q" {
    export class Q<T = unknown> {
        /** Internal **a**rray of queued items. */
        private a;
        /** Internal **h**ead of the queue (as an offset on the internal array). */
        private h;
        /** Creates a new queue, optionally with a specified array of items. */
        constructor(items?: T[]);
        /** Adds one item to the back/tail of the queue (enqueue). */
        push(item: T): void;
        /** Removes one item from the front/head of the queue (dequeue). */
        shift(): number | undefined;
        /** Returns the item at the specified index without removing it (peek). */
        at(index: number): T;
        /** Number of items currently held in the queue. */
        size(): number;
        /** Whether the queue has any items. Useful in `while` loops. */
        hasItems(): boolean;
        /** Returns an array of all items in the queue. */
        toArray(): T[];
        /** Resets the queue, optionally to a specified array of items. */
        reset(items?: T[]): void;
    }
}
