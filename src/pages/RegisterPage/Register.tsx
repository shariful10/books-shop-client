import Logo from "@/components/layout/navbar/Logo";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifyToken } from "@/lib/verifyToken";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { TAccessToken, TResponse, TUser, TUserResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registrationSchema } from "./registerValidation";

const Register = () => {
	const form = useForm({
		resolver: zodResolver(registrationSchema),
	});

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [registerUser, { isLoading }] = useRegisterMutation();

	const password = form.watch("password");
	const passwordConfirm = form.watch("passwordConfirm");

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const modifiedData = {
			name: data.name,
			email: data.email,
			profileImg: data.profileImg,
			password: data.password,
		};

		try {
			const res = (await registerUser(modifiedData)) as TResponse<
				TUserResponse & TAccessToken
			>;

			const user = verifyToken(res.data!.data.accessToken as string);

			dispatch(
				setUser({
					user: user as TUser,
					token: res.data!.data.accessToken as string,
				})
			);

			if (res?.data?.success) {
				toast.success(res?.data?.message);
				form.reset();
				navigate("/");
			} else {
				toast.error(res?.data?.message);
			}
		} catch (err: any) {
			console.log(err);
		}
	};

	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md mx-auto w-full p-5 mt-10">
				<div className="flex items-center space-x-4 mb-8">
					<Logo />
					<div>
						<h1 className="text-xl font-semibold">Register</h1>
						<p className="font-extralight text-sm text-gray-600">
							Join us today and start your journey!
						</p>
					</div>
				</div>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Name<span className="text-red-600 -ml-1">*</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="Name"
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
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Email<span className="text-red-600 -ml-1">*</span>
									</FormLabel>
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
							name="profileImg"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Profile Image</FormLabel>
									<FormControl>
										<Input
											placeholder="Paste URL here"
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
									<FormLabel>
										Password<span className="text-red-600 -ml-1">*</span>
									</FormLabel>
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
						<FormField
							control={form.control}
							name="passwordConfirm"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Confirm Password
										<span className="text-red-600 -ml-1">*</span>
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											{...field}
											value={field.value || ""}
										/>
									</FormControl>

									{passwordConfirm && password !== passwordConfirm ? (
										<FormMessage>Password does not match</FormMessage>
									) : (
										<FormMessage />
									)}
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							disabled={!!passwordConfirm && password !== passwordConfirm}
							className="mt-5 cursor-pointer w-full"
						>
							{isLoading ? "Registering..." : "Register"}
						</Button>
					</form>
				</FormProvider>
				<p className="text-sm text-gray-600 text-center my-3">
					Already have an account?
					<Link to="/login" className="text-primary ml-1 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
