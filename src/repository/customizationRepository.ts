import { AppDataSource } from "../data-source";
import { Customization } from "../entities/Customization";

export const customizationRepo = () => AppDataSource.getRepository(Customization);