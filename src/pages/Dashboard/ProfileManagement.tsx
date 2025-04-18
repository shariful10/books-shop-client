import Spinner from "@/components/spinner/Spinner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/userManagement/userManagementApi";
import { useAppSelector } from "@/redux/hook";

const ProfileManagement = () => {
	const user = useAppSelector(selectCurrentUser);

	const { data: myData, isFetching } = useGetMeQuery(user?.email);

	if (isFetching) {
		return <Spinner />;
	}

	return (
		<div className="flex justify-center items-center">
			<div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5">
				<h1 className="text-xl font-bold mb-5 text-center">Profile Details</h1>

				<div className="flex justify-center items-center mb-5">
					<Avatar className="border-2 border-primary object-cover cursor-pointer size-48">
						<AvatarImage
							src={
								myData?.data!.profileImg
									? myData?.data!.profileImg
									: "https://mgcfeni.edu.bd/midea/featuredimage/featuredimage2019-03-04-13-47-19_5c7d1e5732a77.jpg"
							}
							alt={myData?.data!.name ?? ""}
						/>
					</Avatar>
				</div>
				<div className="flex flex-col items-center mt-5">
					<h2 className="text-xl font-semibold">Name: {myData?.data!.name}</h2>
					<p className="text-base">Email: {myData?.data!.email}</p>
					<p className="capitalize">Role: {myData?.data!.role}</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileManagement;
