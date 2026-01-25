import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

interface PaginateOptions<T> {
    model: {
        findMany: Function;
        count: Function;
    };
    where?: Prisma.Enumerable<Prisma.InputJsonValue> | any;
    page?: number;
    limit?: number;
    orderBy?: any;
    select?: any;
}

@Injectable()
export class PaginationService {
    async paginate<T>({
        model,
        where,
        page = 1,
        limit = 10,
        orderBy = { createdAt: 'desc' },
        select,
    }: PaginateOptions<T>) {
        const skip = (page - 1) * limit;

        const [total, data] = await Promise.all([
            model.count({ where }),
            model.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                ...(select && { select }),
            }),
        ]);

        return {
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
            data: data,
        }
    }
}