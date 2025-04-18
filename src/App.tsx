import { Outlet } from "react-router-dom";
import Footer from "./components/layout/footer/Footer";
import Navbar from "./components/layout/navbar/Navbar";
import Loading from "./components/spinner/Loading";
import { useGetAllBooksQuery } from "./redux/features/bookManagement/bookManagement";

const App = () => {
	const { isFetching } = useGetAllBooksQuery(undefined);

	return (
		<>
			{isFetching ? (
				<Loading />
			) : (
				<>
					<Navbar />
					<div className="min-h-[calc(100vh-399px)]">
						<Outlet />
					</div>
					<Footer />
				</>
			)}
		</>
	);
};

export default App;
