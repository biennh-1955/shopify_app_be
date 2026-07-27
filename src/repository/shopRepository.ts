import { AppDataSource } from "../data-source";
import { Shop } from "../entities/Shop";

export const shopRepo = () => AppDataSource.getRepository(Shop);
