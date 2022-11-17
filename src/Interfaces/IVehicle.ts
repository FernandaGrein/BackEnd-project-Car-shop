interface IVehicle {
  id?: string;
  _id?: string;
  model: string;
  year: number;
  color: string;
  status?: boolean;
  buyValue: number;
}

export default IVehicle;