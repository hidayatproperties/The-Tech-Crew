import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { mutate: login, isPending } = useLogin();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const onSubmit = (data: any) => {
    login(data, {
      onSuccess: () => {
        setLocation("/admin");
      },
      onError: () => {
        toast({ title: "Login failed", variant: "destructive" });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center font-display">Admin Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input {...register("username")} className="w-full px-4 py-2 rounded-lg border border-border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" {...register("password")} className="w-full px-4 py-2 rounded-lg border border-border" />
          </div>
          <button 
            disabled={isPending}
            className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending ? <Loader2 className="animate-spin mx-auto"/> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
