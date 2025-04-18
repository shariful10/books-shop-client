import Container from "@/components/module/Container";
import SectionTitle from "@/components/module/homePage/SectionTitle";
import { categoriesData } from "@/data/categories";
import { TCategory } from "@/types/category";

const CategorySection = () => {
	return (
		<Container>
			<SectionTitle title="Our Categories" />
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
				{categoriesData.map(({ id, title, image }: TCategory) => (
					<div key={id} className="border-2 pb-2 pt-3 rounded-md">
						<img src={image} alt={title} />
						<h4 className="text-base md:text-xl font-semibold">{title}</h4>
					</div>
				))}
			</div>
		</Container>
	);
};

export default CategorySection;
