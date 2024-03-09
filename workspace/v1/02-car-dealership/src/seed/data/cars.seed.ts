import { Car } from "src/cars/interfaces";
import { v4 as uuid } from 'uuid';


export const CARS_SEED: Car[] = [

    {
        id: uuid(),
        brand: 'Toyota',
        model: 'Camry'
    },
    {
        id: uuid(),
        brand: 'Honda',
        model: 'CR-V'
    },
    {
        id: uuid(),
        brand: 'Audi',
        model: 'S5 Cabriolet'
    },
    {
        id: uuid(),
        brand: 'BMW',
        model: 'X7'
    },
    {
        id: uuid(),
        brand: 'Cadillac',
        model: 'Escalade-V'
    },
    {
        id: uuid(),
        brand: 'Dacia',
        model: 'Jogger'
    },
    {
        id: uuid(),
        brand: 'Fiat',
        model: '500 3+1'
    },
    {
        id: uuid(),
        brand: 'Jaguar',
        model: 'F-Type'
    },
    {
        id: uuid(),
        brand: 'Kia',
        model: 'Sportage'
    },
    {
        id: uuid(),
        brand: 'Lexus',
        model: 'RX'
    },
    {
        id: uuid(),
        brand: 'Mazda',
        model: 'CX-5'
    },
    {
        id: uuid(),
        brand: 'Nissan',
        model: 'Qashqai'
    },
    {
        id: uuid(),
        brand: 'Opel',
        model: 'Corsa'
    },
    {
        id: uuid(),
        brand: 'Peugeot',
        model: '308'
    },
    {
        id: uuid(),
        brand: 'Renault',
        model: 'Clio'
    },
    {
        id: uuid(),
        brand: 'Skoda',
        model: 'Octavia'
    },
    {
        id: uuid(),
        brand: 'Volvo',
        model: 'XC90'
    },
    {
        id: uuid(),
        brand: 'Alfa Romeo',
        model: 'Tonale'
    },
    {
        id: uuid(),
        brand: 'Bugatti',
        model: 'Chiron Pur Sport'
    },
    {
        id: uuid(),
        brand: 'Citroen',
        model: 'C5 X'
    }


]