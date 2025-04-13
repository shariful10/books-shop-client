import { Outlet } from "react-router-dom";
import Footer from "./components/layout/footer/Footer";
import Navbar from "./components/layout/navbar/Navbar";

const App = () => {
	return (
		<>
			<Navbar />
			<div className="min-h-[calc(100vh-399px)]">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default App;
