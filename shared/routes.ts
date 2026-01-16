import { z } from 'zod';
import { insertUserSchema, insertPropertySchema, insertCarSchema, insertEnquirySchema, properties, cars, enquiries, users } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/auth/login',
      input: z.object({
        username: z.string(),
        password: z.string(),
      }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout',
      responses: {
        200: z.void(),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/auth/me',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  properties: {
    list: {
      method: 'GET' as const,
      path: '/api/properties',
      input: z.object({
        type: z.enum(['buy', 'rent']).optional(),
        minPrice: z.string().optional(),
        maxPrice: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof properties.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/properties/:id',
      responses: {
        200: z.custom<typeof properties.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/properties',
      input: insertPropertySchema,
      responses: {
        201: z.custom<typeof properties.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/properties/:id',
      input: insertPropertySchema.partial(),
      responses: {
        200: z.custom<typeof properties.$inferSelect>(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/properties/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
  },
  cars: {
    list: {
      method: 'GET' as const,
      path: '/api/cars',
      input: z.object({
        category: z.enum(['economy', 'luxury', '4x4']).optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof cars.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/cars',
      input: insertCarSchema,
      responses: {
        201: z.custom<typeof cars.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/cars/:id',
      responses: {
        204: z.void(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  enquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/enquiries',
      input: insertEnquirySchema,
      responses: {
        201: z.custom<typeof enquiries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/enquiries',
      responses: {
        200: z.array(z.custom<typeof enquiries.$inferSelect>()),
        401: errorSchemas.unauthorized,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
