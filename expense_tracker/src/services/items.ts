import axios from 'axios';
import IItem from '../models/IItem';

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getItems() {
    const response = await axios.get<IItem[]>(`${baseURL}/items`);
    return response.data;
}

export async function addItem(item: Omit<IItem, 'id'>) {
    const response = await axios.post<IItem>(`${baseURL}/items`, item, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}