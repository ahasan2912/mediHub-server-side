// Pagination utility functions
export const getPaginationParams = (req) => {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const skip = page * size;
    
    return { page, size, skip };
};

export const createPaginatedResponse = (data, page, size, total) => {
    return {
        data,
        pagination: {
            page,
            size,
            total,
            totalPages: Math.ceil(total / size),
            hasNext: (page + 1) * size < total,
            hasPrev: page > 0
        }
    };
};

export default { getPaginationParams, createPaginatedResponse };
