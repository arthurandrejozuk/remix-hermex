import type { LoaderFunctionArgs } from "react-router";
import { api } from "~/services/api.server";

export async function loader({ params }: LoaderFunctionArgs) {
    try {
        const { id } = params;
        if (!id) {
            throw new Response("ID não fornecido: ", { status: 400 });
        }
        const [category, cars] = await Promise.all([api.getCategoryById(id), api.getCarsByCategory(id)])
        return { category, cars }
    } catch (err) {
        throw new Response("Categoria não encontrada: ", {status: 404})
    }
}

export default function CategoriesDetailsRoute({ params }: {params: {id: string}}) {
    return (
        <div>
            <h1>Categorias Detalhes: {params.id}</h1>
        </div>
    )
}