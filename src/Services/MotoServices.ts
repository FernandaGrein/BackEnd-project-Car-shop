import { isValidObjectId } from 'mongoose';
import MotorCycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotoODM from '../Models/MotoODM';
import INvalidIdError from '../Middlewares/InvalidIdError';
import NotFoundError from '../Middlewares/NotFoundError';

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
    if (!isValidObjectId(id)) throw new INvalidIdError('Invalid mongo id');
    const motoOdm = new MotoODM();
    const motoById = await motoOdm.findById(id);

    if (motoById === null) throw new NotFoundError('Motorcycle not found');

    return this.createMotoDomain(motoById);
  }

  public async updateMotobyId(id: string, motoToUpdate: IMotorcycle) {
    if (!isValidObjectId(id)) throw new INvalidIdError('Invalid mongo id');
    
    const motoOdm = new MotoODM();
    const updatedMoto = await motoOdm.updateById(id, motoToUpdate);
    
    if (updatedMoto === null) throw new NotFoundError('Motorcycle not found');

    return this.createMotoDomain(updatedMoto);
  }
}

export default MotoServices;