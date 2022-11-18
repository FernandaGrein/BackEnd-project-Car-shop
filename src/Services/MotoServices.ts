import { isValidObjectId } from 'mongoose';
import MotorCycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotoODM from '../Models/MotoODM';
import INvalidIdError from '../Middlewares/InvalidIdError';
import NotFoundError from '../Middlewares/NotFoundError';

const NOT_FOUND = 'Motorcycle not found';
const INVALID_ID = 'Invalid mongo id';
class MotoServices {
  public createMotoDomain(motoObj: IMotorcycle): MotorCycle {
    return new MotorCycle(motoObj);
  }

  public async createMoto(motoObj: IMotorcycle) {
    const motoOdm = new MotoODM();
    const newMoto = await motoOdm.create(motoObj);
    
    return this.createMotoDomain(newMoto);
  }

  public async getAllMotos() {
    const motoOdm = new MotoODM();
    const allMotos = await motoOdm.findAll();

    const motos = allMotos.map((item) => this.createMotoDomain(item));
    return motos;
  }

  public async getMotoById(id: string) {
    if (!isValidObjectId(id)) throw new INvalidIdError(INVALID_ID);
    const motoOdm = new MotoODM();
    const motoById = await motoOdm.findById(id);

    if (motoById === null) throw new NotFoundError(NOT_FOUND);

    return this.createMotoDomain(motoById);
  }

  public async updateMotobyId(id: string, motoToUpdate: IMotorcycle) {
    if (!isValidObjectId(id)) throw new INvalidIdError(INVALID_ID);
    
    const motoOdm = new MotoODM();
    const updatedMoto = await motoOdm.updateById(id, motoToUpdate);
    
    if (updatedMoto === null) throw new NotFoundError(NOT_FOUND);

    return this.createMotoDomain(updatedMoto);
  }

  public async deleteMotoById(id: string) {
    if (!isValidObjectId(id)) throw new INvalidIdError(INVALID_ID);

    const motoOdm = new MotoODM();
    const deletedMoto = await motoOdm.deleteById(id);

    if (!deletedMoto) throw new NotFoundError(NOT_FOUND);

    return this.createMotoDomain(deletedMoto);
  }
}

export default MotoServices;