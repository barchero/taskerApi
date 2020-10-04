import {DecodedJWT} from '../entities/DecodedJWT';

export abstract class Decode<T> {
    abstract execute(token: string): DecodedJWT<T>;
}
