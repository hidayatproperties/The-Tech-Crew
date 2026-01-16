import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertEnquiry } from "@shared/schema";

export function useEnquiries() {
  return useQuery({
    queryKey: [api.enquiries.list.path],
    queryFn: async () => {
      const res = await fetch(api.enquiries.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch enquiries");
      return api.enquiries.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateEnquiry() {
  return useMutation({
    mutationFn: async (data: InsertEnquiry) => {
      const res = await fetch(api.enquiries.create.path, {
        method: api.enquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit enquiry");
      return api.enquiries.create.responses[201].parse(await res.json());
    },
  });
}
