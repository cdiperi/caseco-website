import { get, post, put, del } from 'aws-amplify/api';

export type TableName = 'manufacturers' | 'products' | 'nav-items' | 'downloads';

interface PaginationParams {
    limit?: number;
    nextToken?: string;
}

interface QueryParams extends PaginationParams {
    [key: string]: any;
}

interface ListResponse<T> {
    items: T[];
    count: number;
    scannedCount: number;
    nextToken?: string;
}

class AdminService {
    private apiName = 'AdminAPI';
    private basePath = '/tables';

    private async request<T>(method: any, path: string, options: any = {}): Promise<T> {
        try {
            return await method({
                apiName: this.apiName,
                path,
                options
            }).response;
        } catch (error) {
            console.error(`Error in ${method.name} request to ${path}:`, error);
            throw error;
        }
    }

    async getItems<T>(tableName: TableName, queryParams?: QueryParams): Promise<ListResponse<T>> {
        const path = `${this.basePath}/${tableName}`;
        return this.request<ListResponse<T>>(get, path, { queryParams });
    }

    async getItem<T>(tableName: TableName, id: string, sortKey?: string): Promise<T> {
        const path = sortKey ? `${this.basePath}/${tableName}/${id}/${sortKey}` : `${this.basePath}/${tableName}/${id}`;
        return this.request<T>(get, path);
    }

    async createItem<T>(tableName: TableName, item: T): Promise<T> {
        const path = `${this.basePath}/${tableName}`;
        return this.request<T>(post, path, { body: item });
    }

    async updateItem<T>(tableName: TableName, id: string, item: T, sortKey?: string): Promise<T> {
        const path = sortKey ? `${this.basePath}/${tableName}/${id}/${sortKey}` : `${this.basePath}/${tableName}/${id}`;
        return this.request<T>(put, path, { body: item });
    }

    async deleteItem(tableName: TableName, id: string, sortKey?: string): Promise<void> {
        const path = sortKey ? `${this.basePath}/${tableName}/${id}/${sortKey}` : `${this.basePath}/${tableName}/${id}`;
        await this.request<void>(del, path);
    }
}

export const adminService = new AdminService();
