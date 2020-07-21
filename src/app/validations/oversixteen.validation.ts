import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function overSixteen(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const dob = control.value;
    const today = moment().startOf('day');
    const delta = today.diff(dob, 'years', false);

    if (delta < 16) {
      return {
        underSixteen: {
          requiredAge: '16+',
          currentAge: delta,
        },
      };
    }

    return null;
  };
}
