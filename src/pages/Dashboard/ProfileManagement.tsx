import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";

const ProfileManagement = () => {
	const user = useAppSelector(selectCurrentUser);

	return (
		<div className="flex justify-center items-center">
			<div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5">
				<h1 className="text-xl font-bold mb-5 text-center">Profile Details</h1>

				<div className="flex justify-center items-center mb-5">
					<Avatar className="border-2 border-primary object-cover cursor-pointer size-48">
						<AvatarImage
							src={
								user?.profileImg
									? user?.profileImg
									: "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg"
							}
							alt={user?.name ?? ""}
						/>
					</Avatar>
				</div>
				<div className="flex flex-col items-center mt-5">
					<h2 className="text-xl font-semibold">Name: {user?.name}</h2>
					<p className="text-base">Email: {user?.email}</p>
					<p className="capitalize">Role: {user?.role}</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileManagement;
