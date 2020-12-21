import { Magacin } from './Magacin';
import { Preduzece } from './Preduzece';
export class Radnik {
  idRadnika: number;
  imePrezime: string;
  password: string;
  username: string;
  magacini: Magacin[];
  preduzeca: Preduzece[];
}
