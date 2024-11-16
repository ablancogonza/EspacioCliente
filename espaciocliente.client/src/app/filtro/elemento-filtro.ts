import { KeyValueDto } from "../shared/dtos/key-value-dto";

export interface ElementoFiltro {
  id: number;
  titulo: string;
  seleccionado: KeyValueDto | undefined;
  coincidentes: KeyValueDto[];
  activo: boolean;
}
