import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { InsertCar } from "@shared/schema";

export function useCars(category?: 'economy' | 'luxury' | '4x4') {
  const queryString = category ? `?category=${category}` : '';
  const url = api.cars.list.path + queryString;

  return useQuery({
    queryKey: [api.cars.list.path, category],
    queryFn: async () => {
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch cars");
      return api.cars.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertCar) => {
      const res = await fetch(api.cars.create.path, {
        method: api.cars.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create car");
      return api.cars.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.cars.list.path] });
    },
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.cars.delete.path, { id });
      const res = await fetch(url, {
        method: api.cars.delete.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete car");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.cars.list.path] });
    },
  });
}
