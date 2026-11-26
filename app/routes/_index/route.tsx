import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { api } from "~/services/api.server";

export async function loader({ request }: LoaderFunctionArgs) {
    try {
        const cars = await api.getCars();
        return cars.slice(0, 6);
    } catch (err) {
        throw new Response("Erro ao buscar veículos:", {status: 500})
    }
}

export default function IndexRoute() {
    const cars = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>_Index Route</h1>
            {cars.map(car => (
                <div key={car.id}>
                    <h1>{car.title}</h1>
                    <p>{car.description}</p>
                </div>
            ))}
        </div>

    )
}