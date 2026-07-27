import { AppDataSource } from "../data-source";
import { Translation } from "../entities/Translation";

export const translationRepo = () => AppDataSource.getRepository(Translation);