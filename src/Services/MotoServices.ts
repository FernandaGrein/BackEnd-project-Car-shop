import MotorCycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotoODM from '../Models/MotoODM';

class MotoServices {
  public createMotoDomain(motoObj: IMotorcycle): MotorCycle {
    return new MotorCycle(motoObj);
  }

  public async createMoto(motoObj: IMotorcycle) {
    const motoOdm = new MotoODM();
    const newMoto = await motoOdm.create(motoObj);
    
    return this.createMotoDomain(newMoto);
  }
}

export default MotoServices;