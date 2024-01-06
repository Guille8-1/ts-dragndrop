export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const origianlMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = origianlMethod.bind(this);
            return boundFn
        }
    };
    return adjDescriptor
}