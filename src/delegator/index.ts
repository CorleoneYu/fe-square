import { Delegator, DelegateType } from '@/delegator/delegator';

interface IPhone {
  phoneNumber: string;
  call(phoneNumber: string): void;
}

class Phone implements IPhone {
  public phoneNumber = '12345';

  public call(phoneNumber: string) {
    console.log('call', phoneNumber);
  }
}

export class Man {
  public phone = new Phone();
}

export interface Man extends IPhone {}

Delegator.delegates(Man.prototype, 'phone', {
  // function name
  call: DelegateType.METHOD,
  // property name
  phoneNumber: DelegateType.GETTER,
});

function main() {
  const man = new Man();
  man.call(man.phoneNumber);
}

main();
