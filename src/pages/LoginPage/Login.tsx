import Logo from "@/components/layout/navbar/Logo";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifyToken } from "@/lib/verifyToken";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { TLoggedUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const form = useForm({
		resolver: zodResolver(loginSchema),
	});

	const [login, { isLoading }] = useLoginMutation();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		try {
			const res = await login(data).unwrap();

			if (res.error) {
				toast.error(res?.error?.data.message);
			}

			const user = verifyToken(res?.data?.accessToken as string) as TLoggedUser;

			dispatch(
				setUser({
					user: user,
					token: res.data?.accessToken as string,
				})
			);

			toast.success(res.message);
			navigate("/");
			form.reset();
		} catch (err: any) {
			toast.error("Failed to login!");
			throw new Error(err);
		}
		form.reset();
	};

	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md mx-auto w-full p-5 mt-10">
				<div className="flex items-center space-x-4 mb-8">
					<Logo />
					<div>
						<h1 className="text-xl font-semibold">Login</h1>
						<p className="font-extralight text-sm text-gray-600">
							Welcome back!
						</p>
					</div>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Email Address"
											{...field}
											value={field.value || ""}
										/>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Password"
											{...field}
											value={field.value || ""}
										/>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="mt-5 cursor-pointer w-full">
							{isLoading ? "Logging..." : "Login"}
						</Button>
					</form>
				</Form>
				<p className="text-sm text-gray-600 text-center my-3">
					Do not have any account?
					<Link to="/register" className="text-primary ml-1 hover:underline">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
