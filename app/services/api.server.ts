import type { Category, Car } from "~/types";


// Criando um serviço que buscará os dados da API 
// Além de criar métodos para cada tipo de dado
// Seja Categoria ou Carros

const API_BASE_URL = "http://localhost:3000";

async function fetchApi<T>(endpoints: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoints}`;
    const response = await fetch(url, {
        ...options, headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        }
    });
    if (!response.ok) {
        throw new Response(`Erro ao buscar ${url}: ${response.statusText}`);
    }
    return response.json();
}

export const api = {
    async getCategories(): Promise<Category[]> {
        return fetchApi("/category");
    },
    async getCategoryById(id: number | string): Promise<Category> {
        return fetchApi(`/category/${id}`);
    },
    async getCars(): Promise<Car[]> {
        return fetchApi("/car");
    },
    async getCarById(id: number | string): Promise<Car> {
        return fetchApi(`/car/${id}`);
    },
    async getCarsByCategory(categoryId: number | string): Promise<Car[]> {
        const params = new URLSearchParams();
        params.append("categoryId", categoryId.toString());
        return fetchApi(`/car?${params.toString()}`);
    }
}