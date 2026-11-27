import type { LoaderFunctionArgs } from "react-router"; 
import { api } from "~/services/api.server";


export async function loader({ request }: LoaderFunctionArgs) {
    try {
        const [cars, categories]  = await Promise.all([api.getCars(), api.getCategories() ]);
        const categoriesWithCarsCount = categories.map(category => ({ ...category, carCount: cars.filter(car => car.categoryId === category.id) }))
        return categoriesWithCarsCount;
    } catch (err) {
        throw new Response("Erro ao buscar categorias: ", { status: 500})
    }
}


export default function CategoriesRoute() {
    return (
        <div>
            <h1>Categorias</h1>
        </div>
    )
}