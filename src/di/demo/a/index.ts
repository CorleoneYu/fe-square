import { IAService } from '@/di/demo/a/a.interface';
import { IBServiceDecorator } from '@/di/demo/b';
import { IBService } from '@/di/demo/b/b.interface';
import { createDecorator } from '@/lib/cool-di/instantiation';

export const IAServiceDecorator = createDecorator<IAService>('AService');

export class AServiceImpl implements IAService {
    _serviceBrand: undefined;
    id: string;
    name: string;

    constructor(@IBServiceDecorator private bService: IBService) {
        this.id = 'a-id';
        this.name = 'a-name';
    }
}
