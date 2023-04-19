
import { Brand } from 'src/brands/entities/brand.entity';
import { v4 as uuid } from 'uuid';


export const BRANDS_SEED: Brand[] = [

    {
        id: uuid(),
        name: 'Toyota',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Honda',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Ford',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Tesla',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'BMW',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Audi',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Mercedes',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Hyundai',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Nissan',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Chevrolet',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Mazda',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Subaru',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Kia',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Ferrari',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Lamborghini',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Porsche',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Volkswagen',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Renault',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Peugeot',
        createAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Citroen',
        createAt: new Date().getTime()
    }


]