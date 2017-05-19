'use strict';

export class Buffer {
    capacity: number;
    length: number;
    private buf: Uint8Array;

    constructor(capacity: number = 128) {
        this.length = 0;
        this.capacity = capacity;
        this.buf = new Uint8Array(capacity);
    }

    reserve(increment: number) {
        if (this.capacity - this.length > increment) {
            return;
        }

        this.capacity += Math.max(increment, this.capacity);

        const buf = new Uint8Array(this.capacity);
        buf.set(this.buf, 0);

        this.buf = buf;
    }

    push(byte: number) {
        this.reserve(1);
        this.buf[this.length++] = byte;
    }

    fill(byte: number, repeat: number) {
        this.reserve(repeat);

        while (repeat--) {
            this.buf[this.length++] = byte;
        }
    }

    at(index: number): number {
        return this.buf[index];
    }

    asUint8Array(): Uint8Array {
        return this.buf.subarray(0, this.length);
    }
}
