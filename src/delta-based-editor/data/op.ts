/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) 2022, Slab, Inc.
 *--------------------------------------------------------------------------------------------*/

/**
 * 这个文件引用自开源项目 Delta： https://github.com/quilljs/delta
 */

import AttributeMap from './attribute-map';

interface Op {
    // only one property out of {insert, delete, retain} will be present
    insert?: string | Record<string, unknown>;
    delete?: number;
    retain?: number;

    attributes?: AttributeMap;
}

namespace Op {
    export function length(op: Op): number {
        if (typeof op.delete === 'number') {
            return op.delete;
        } else if (typeof op.retain === 'number') {
            return op.retain;
        } else {
            return typeof op.insert === 'string' ? op.insert.length : 1;
        }
    }
}

export default Op;
