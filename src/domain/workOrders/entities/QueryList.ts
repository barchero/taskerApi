import {PaginationOptions} from '@domain/pagination/entities/PaginationOptions';

export class QueryList {
    where?: {
        [W in string]: unknown
    };
    pagination?: PaginationOptions;
    orderBy?: {
        [P in keyof unknown]?: "ASC" | "DESC" | 1 | -1;
    };
}
