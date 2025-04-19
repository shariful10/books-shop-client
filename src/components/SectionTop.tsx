const SectionTop = ({ pageTitle }: { pageTitle: string }) => {
	return (
		<div className="flex justify-center items-center text-white bg-primary h-[300px] rounded-2xl my-10">
			<h1 className="text-2xl md:text-4xl font-bold">{pageTitle}</h1>
		</div>
	);
};

export default SectionTop;
