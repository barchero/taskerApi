export abstract class Manager<ReferenceTypeEnum, InstanceType> {
    abstract referenceStore: Map<ReferenceTypeEnum, InstanceType>;

    abstract getReference(type: ReferenceTypeEnum): InstanceType
    abstract setReference(type: ReferenceTypeEnum, instance: InstanceType)

    protected hasCorrectMetadata(reference: any, metadataKeys: string[]): boolean{
        const tempInstance = new reference();
        const objMetadataKeys = Reflect.getOwnMetadataKeys(tempInstance);
        let err = false;
        const validateKey = (key: string) => {
            if (metadataKeys.includes(key)) {
                return;
            }
            err = true;
        };
        objMetadataKeys.forEach(validateKey);
        return !err;
    }
}
