
import { IBService } from '@/di/demo/b/b.interface';
import { createDecorator } from '@/lib/cool-di/instantiation';

export const IBServiceDecorator = createDecorator<IBService>('BService');

export class BServiceImpl implements IBService {
    id: string;
    name: string;
    constructor() {
        this.id = 'b-id';
        this.name = 'b-name';
    }
}
