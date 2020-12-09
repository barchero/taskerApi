import {PaginationOptions} from '@domain/pagination/entities/PaginationOptions';

export class QueryList<T> {
    where?: { [W in keyof T]?: unknown } | string;
    pagination?: PaginationOptions;
    orderBy?: {
        [P in (keyof T) | string]?: "ASC" | "DESC";
    };
}
