import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { userRole } from "@/constants";
import { adminData, userData } from "@/data/sidebar";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { ComponentProps } from "react";
import Logo from "../../navbar/Logo";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
	const user = useAppSelector(selectCurrentUser);
	const role = user?.role ?? userRole.USER;

	let data;

	switch (role) {
		case userRole.USER:
			data = userData;
			break;
		case userRole.ADMIN:
			data = adminData;
			break;
		case userRole.SUPER_ADMIN:
			data = adminData;
			break;
		default:
			break;
	}

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="default"
							asChild
							className="h-full hover:bg-transparent"
						>
							<Logo className="w-auto h-14" />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data!.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};
