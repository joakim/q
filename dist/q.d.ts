declare module "q" {
    export class Q<T = unknown> {
        private list;
        private head;
        private tail;
        /** Creates a new queue, optionally with a specified array of items. */
        constructor(items?: Array<T>);
        /** Adds an item to the tail of the queue (enqueue). */
        push(item: T): void;
        /** Removes one item from the head of the queue (dequeue). */
        shift(): T;
        /** Returns the item at the specified index without removing it (peek). */
        at(index: number): T;
        /** Number of items currently held in the queue. */
        size(): number;
        /** Whether the queue has any items. */
        hasItems(): boolean;
        /** Returns an array of all items in the queue. */
        toArray(): T[];
        /** Resets the queue, optionally to a specified array of items. */
        reset(items?: Array<T>): void;
    }
}
