import { createDecorator, getServiceDependencies, ServiceIdentifier } from '../instantiation';
import ServiceCollection from '../serviceCollection';
import { SyncDescriptor } from '../descriptors';
import { IInstantiationService } from './interface';
import Graph from './graph';

class CyclicDependencyError extends Error {
    constructor(graph: Graph<any>) {
        super('cyclic dependency between services');
        this.message = graph.toString();
    }
}

export const IInstantiationServiceId = createDecorator<IInstantiationService>('instantiationService');

export class InstantiationService implements IInstantiationService {
    declare readonly serviceBrand: undefined;

    private readonly services: ServiceCollection;
    private readonly parent?: InstantiationService;

    constructor(services: ServiceCollection = new ServiceCollection(), parent?: InstantiationService) {
        this.services = services;
        this.parent = parent;

        this.services.set(IInstantiationServiceId, this);
    }

    createChild(services: ServiceCollection): IInstantiationService {
        return new InstantiationService(services, this);
    }

    createInstance(ctorOrDescriptor: any | SyncDescriptor<any>, ...rest: any[]): any {
        // trace
        let result: any;
        if (ctorOrDescriptor instanceof SyncDescriptor) {
            const { ctor, staticArguments } = ctorOrDescriptor;
            result = this._createInstance(ctor, staticArguments.concat(rest));
        } else {
            result = this._createInstance(ctorOrDescriptor, rest);
        }

        return result;
    }

    private _createInstance<T>(ctor: any, args: any[] = []): T {
        let serviceDependencies = getServiceDependencies(ctor).sort((a, b) => a.index - b.index);
        let serviceArgs: any[] = [];
        for (const dependency of serviceDependencies) {
            let service = this._getOrCreateServiceInstance(dependency.id);
            if (!service) {
                throw new Error(`[createInstance] ${ctor.name} depends on UNKNOWN service ${dependency.id}.`);
            }
            serviceArgs.push(service);
        }

        let firstServiceArgPos = serviceDependencies.length > 0 ? serviceDependencies[0].index : args.length;

        // check for argument mismatches, adjust static args if needed
        if (args.length !== firstServiceArgPos) {
            console.warn(
                `[createInstance] First service dependency of ${ctor.name} at position ${
                    firstServiceArgPos + 1
                } conflicts with ${args.length} static arguments`,
            );

            let delta = firstServiceArgPos - args.length;
            if (delta > 0) {
                args = args.concat(new Array(delta));
            } else {
                args = args.slice(0, firstServiceArgPos);
            }
        }

        // now create the instance
        return new ctor(...[...args, ...serviceArgs]) as T;
    }

    /**
     * 通过服务 id, 返回服务实例
     * @param id 服务id
     */
    private _getOrCreateServiceInstance<T>(id: ServiceIdentifier<T>): T {
        let thing = this._getServiceInstanceOrDescriptor(id);
        if (thing instanceof SyncDescriptor) {
            return this._createAndCacheServiceInstance(id, thing);
        }

        return thing;
    }

    private _getServiceInstanceOrDescriptor<T>(id: ServiceIdentifier<T>): T | SyncDescriptor<T> {
        const instanceOrDesc = this.services.get(id);
        if (!instanceOrDesc && this.parent) {
            return this.parent._getServiceInstanceOrDescriptor(id);
        }
        return instanceOrDesc;
    }

    /**
     * 核心：根据 依赖关系 创建 并 缓存 服务
     * @param id 要创建的服务
     * @param desc 要创建的服务的描述符
     */
    private _createAndCacheServiceInstance<T>(id: ServiceIdentifier<T>, desc: SyncDescriptor<T>): T {
        type TDependency = {
            id: ServiceIdentifier<any>;
            desc: SyncDescriptor<any>;
        };
        const graph = new Graph<TDependency>((data) => data.id.toString());

        let cycleCount = 0;
        const root: TDependency = {
            id,
            desc,
        };
        const stack = [root];
        while (stack.length) {
            const item = stack.pop()!;
            graph.lookupOrInsertNode(item);

            // 简单的循环次数检测
            // 正常来说不应该循环这么多次
            if (cycleCount++ > 1000) {
                throw new CyclicDependencyError(graph);
            }

            // 根据构造器，返回其依赖的服务列表
            const dependencyList = getServiceDependencies(item.desc.ctor);

            // 检查依赖的服务列表是否存在，若不存在则需要创建
            for (let dependency of dependencyList) {
                let instanceOrDesc = this._getServiceInstanceOrDescriptor(dependency.id);
                if (instanceOrDesc instanceof SyncDescriptor) {
                    const depNode = {
                        id: dependency.id,
                        desc: instanceOrDesc,
                    };
                    // 若为服务实例，不用加入 graph 吗？
                    graph.insertEdge(item, depNode);
                    stack.push(depNode);
                }
            }
        }

        while (true) {
            const roots = graph.roots();

            // 如果没有 root ，判断是否存在 node 没被创建
            // 不存在 node，则证明流程完成
            // 存在 node, 则证明存在 循环依赖
            if (roots.length === 0) {
                if (!graph.isEmpty()) {
                    throw new CyclicDependencyError(graph);
                }
                // 正常结束
                break;
            }

            for (const { data } of roots) {
                const instanceOrDesc = this._getServiceInstanceOrDescriptor(data.id);
                if (instanceOrDesc instanceof SyncDescriptor) {
                    const instance = this._createServiceInstanceWithOwner(
                        data.id,
                        data.desc.ctor,
                        data.desc.staticArguments,
                        data.desc.supportsDelayedInstantiation,
                    );
                }
            }
        }

        return this._getServiceInstanceOrDescriptor(id) as T;
    }

    private _createServiceInstanceWithOwner<T>(
        id: ServiceIdentifier<T>,
        ctor: any,
        args: any[] = [],
        supportsDelayedInstantiation: boolean,
    ): T {
        if (this.services.get(id) instanceof SyncDescriptor) {
            return this._createServiceInstance(ctor, args, supportsDelayedInstantiation);
        }

        if (this.parent) {
            this.parent._createServiceInstanceWithOwner(id, ctor, args, supportsDelayedInstantiation);
        }

        throw new Error(`illegalState - creating UNKNOWN service instance ${ctor.name}`);
    }

    // 核心：创建目标服务实例(含 proxy)
    // 此时目标服务 所需要的 依赖已创建完毕
    private _createServiceInstance<T>(ctor: any, args: any[], supportsDelayedInstantiation: boolean): T {
        if (!supportsDelayedInstantiation) {
            return this._createInstance(ctor, args);
        }

        // TODO: 返回 proxy
        return this._createInstance(ctor, args);
    }
}
